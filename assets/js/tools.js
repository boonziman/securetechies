/**
 * Secure Techies — Free IT Tools (v2)
 * Browser-only calculators. Formulas documented in-page for transparency.
 */
(function () {
  "use strict";

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function on(el, ev, fn) {
    if (el) el.addEventListener(ev, fn);
  }
  function num(el, fallback) {
    if (!el) return fallback || 0;
    var v = parseFloat(String(el.value).replace(/,/g, ""));
    return isFinite(v) ? v : fallback || 0;
  }
  function int(el, fallback) {
    return Math.round(num(el, fallback));
  }
  function fmt(n, digits) {
    if (!isFinite(n)) return "—";
    var d = digits == null ? 2 : digits;
    return Number(n).toLocaleString(undefined, {
      maximumFractionDigits: d,
      minimumFractionDigits: 0,
    });
  }
  function fmtMoney(n) {
    if (!isFinite(n)) return "—";
    return "$" + Math.round(n).toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
  function showErr(id, msg) {
    var el = document.getElementById(id);
    if (!el) return;
    if (!msg) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = msg;
  }
  function bindForm(form, calc) {
    if (!form) return;
    $all("input, select, textarea", form).forEach(function (el) {
      on(el, "input", calc);
      on(el, "change", calc);
    });
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function emailDomain(value) {
    var m = String(value || "").match(/[A-Z0-9._%+-]+@([A-Z0-9.-]+\.[A-Z]{2,})/i);
    return m ? m[1].toLowerCase() : "";
  }
  function extractEmail(value) {
    var m = String(value || "").match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    return m ? m[0].toLowerCase() : String(value || "").trim();
  }
  function copyText(val, statusId, label) {
    if (!val) return;
    function ok() {
      setText(statusId, label || "Copied");
      setTimeout(function () { setText(statusId, ""); }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(val).then(ok).catch(function () {});
    }
  }

  /* ============================================================
     RAID — 0, 1, 1E, 5, 6, 10, 50, 60
     Usable formulas (equal disks of size S, n data disks excluding spares):
       0:  n*S
       1:  S  (full mirror of one volume)
       1E: floor(n/2)*S  (approx; offset mirror)
       5:  (n-1)*S
       6:  (n-2)*S
       10: (n/2)*S  (n even)
       50: (n - groups)*S  where groups = RAID-5 stripes (min 2 groups of 3)
       60: (n - 2*groups)*S
     ============================================================ */
  function initRAID(root) {
    var form = $("#st-raid-form", root);
    if (!form) return;

    function calc() {
      var n = int($("#raid-disks", root), 0);
      var size = num($("#raid-size", root), 0);
      var unit = ($("#raid-unit", root) || {}).value || "TB";
      var level = ($("#raid-level", root) || {}).value || "5";
      var hotSpares = Math.max(0, int($("#raid-spares", root), 0));
      var groups = Math.max(2, int($("#raid-groups", root), 2));
      var iopsBase = Math.max(0, num($("#raid-iops", root), 150));
      var ure = num($("#raid-ure", root), 14); // 10^ure bits per URE (14 = 10^14)
      var showGroups = level === "50" || level === "60";
      var gField = $("#raid-groups-wrap", root);
      if (gField) gField.hidden = !showGroups;

      showErr("raid-error", "");
      if (n < 1 || size <= 0) {
        showErr("raid-error", "Enter at least 1 data disk and a positive disk size.");
        return paintEmpty();
      }

      var minMap = { "0": 2, "1": 2, "1E": 3, "5": 3, "6": 4, "10": 4, "50": 6, "60": 8 };
      var min = minMap[level] || 2;
      if (n < min) {
        showErr("raid-error", "RAID " + level + " needs at least " + min + " data disks (hot spares extra).");
        return paintEmpty();
      }
      if ((level === "10" || level === "1E") && level === "10" && n % 2 !== 0) {
        showErr("raid-error", "RAID 10 requires an even number of data disks.");
        return paintEmpty();
      }
      if (level === "50" || level === "60") {
        var perGroupMin = level === "50" ? 3 : 4;
        if (n % groups !== 0) {
          showErr("raid-error", "For RAID " + level + ", disk count must divide evenly into " + groups + " groups.");
          return paintEmpty();
        }
        if (n / groups < perGroupMin) {
          showErr("raid-error", "Each RAID " + level + " group needs at least " + perGroupMin + " disks.");
          return paintEmpty();
        }
      }

      var raw = n * size;
      var usable = 0;
      var fault = "—";
      var readMult = 1;
      var writeMult = 1;
      var notes = "";

      switch (level) {
        case "0":
          usable = raw;
          fault = "None — any disk failure destroys the array";
          readMult = n;
          writeMult = n;
          notes = "Striping only. Never use alone for important data.";
          break;
        case "1":
          usable = size;
          fault = n - 1 + " disk failure(s) in a full mirror set";
          readMult = n;
          writeMult = 1;
          notes = "All disks mirror one volume. Capacity equals one disk.";
          break;
        case "1E":
          usable = Math.floor(n / 2) * size;
          fault = "Typically 1 disk (layout-dependent)";
          readMult = n;
          writeMult = n / 2;
          notes = "Offset mirroring. Capacity ≈ half of raw (floor n/2).";
          break;
        case "5":
          usable = (n - 1) * size;
          fault = "1 disk";
          readMult = n - 1;
          writeMult = (n - 1) / 4; // classic parity write penalty approximation
          notes = "Single parity. Rebuild risk rises on multi-TB disks.";
          break;
        case "6":
          usable = (n - 2) * size;
          fault = "2 disks";
          readMult = n - 2;
          writeMult = (n - 2) / 6;
          notes = "Dual parity. Preferred for large bulk / backup arrays.";
          break;
        case "10":
          usable = (n / 2) * size;
          fault = "Up to " + n / 2 + " disks (one per mirror pair ideal)";
          readMult = n;
          writeMult = n / 2;
          notes = "Striped mirrors. Strong for VMs, databases, and write load.";
          break;
        case "50":
          usable = (n - groups) * size;
          fault = "1 disk per RAID-5 group (groups=" + groups + ")";
          readMult = n - groups;
          writeMult = (n - groups) / 4;
          notes = "Striped RAID-5 groups. Better rebuild isolation than single RAID-5.";
          break;
        case "60":
          usable = (n - 2 * groups) * size;
          fault = "2 disks per RAID-6 group (groups=" + groups + ")";
          readMult = n - 2 * groups;
          writeMult = (n - 2 * groups) / 6;
          notes = "Striped RAID-6 groups. High resilience for large arrays.";
          break;
        default:
          showErr("raid-error", "Unknown RAID level.");
          return paintEmpty();
      }

      var efficiency = raw > 0 ? (usable / raw) * 100 : 0;
      var parity = Math.max(0, raw - usable);
      var usableGB = unit === "GB" ? usable : usable * 1000;
      var usableTiB = usableGB / 1024;
      var readIOPS = Math.max(0, iopsBase * readMult);
      var writeIOPS = Math.max(0, iopsBase * writeMult);

      // Rough URE rebuild risk for parity RAID (educational)
      // Risk rises when (array size in bits) approaches URE rate during rebuild reads
      var rebuildRisk = "Low / n/a";
      if (level === "5" || level === "6" || level === "50" || level === "60") {
        var bitsToRead = (n - (level === "6" || level === "60" ? 2 : 1)) * size * 1e12 * 8; // approx if TB decimal
        if (unit === "GB") bitsToRead = (n - 1) * size * 1e9 * 8;
        var ureBits = Math.pow(10, ure);
        var ratio = bitsToRead / ureBits;
        if (ratio < 0.1) rebuildRisk = "Lower";
        else if (ratio < 0.5) rebuildRisk = "Moderate — consider RAID 6/10";
        else rebuildRisk = "Elevated on large disks — prefer RAID 6/10 + backups";
      }

      setText("raid-usable", fmt(usable, 2) + " " + unit);
      setText("raid-usable-alt", fmt(usableGB, 0) + " GB · ≈ " + fmt(usableTiB, 2) + " TiB");
      setText("raid-raw", fmt(raw, 2) + " " + unit);
      setText("raid-parity", fmt(parity, 2) + " " + unit);
      setText("raid-efficiency", fmt(efficiency, 1) + "%");
      setText("raid-fault", fault);
      setText("raid-read", "≈ " + fmt(readMult, 1) + "× · ~" + fmt(readIOPS, 0) + " IOPS");
      setText("raid-write", "≈ " + fmt(writeMult, 1) + "× · ~" + fmt(writeIOPS, 0) + " IOPS");
      setText("raid-spares-out", String(hotSpares));
      setText("raid-total-drives", String(n + hotSpares));
      setText("raid-rebuild", rebuildRisk);
      setText("raid-notes", notes);
      var bar = $("#raid-efficiency-bar", root);
      if (bar) bar.style.width = Math.max(0, Math.min(100, efficiency)) + "%";
    }

    function paintEmpty() {
      ["raid-usable","raid-usable-alt","raid-raw","raid-parity","raid-efficiency","raid-fault","raid-read","raid-write","raid-spares-out","raid-total-drives","raid-rebuild","raid-notes"].forEach(function (id) {
        setText(id, "—");
      });
      var bar = $("#raid-efficiency-bar", root);
      if (bar) bar.style.width = "0%";
    }

    $all(".raid-preset", root).forEach(function (btn) {
      on(btn, "click", function () {
        var v = parseFloat(btn.getAttribute("data-size"));
        var u = btn.getAttribute("data-unit") || "TB";
        if ($("#raid-size", root)) $("#raid-size", root).value = v;
        if ($("#raid-unit", root)) $("#raid-unit", root).value = u;
        calc();
      });
    });
    bindForm(form, calc);
    calc();
  }

  /* ============================================================
     SURVEILLANCE STORAGE
     GB = bitrateMbps * 1e6/8 * sec/day * days * cameras * motion * scene * audio
     ============================================================ */
  function estimateBitrateMbps(resolution, fps, codec, quality, scene) {
    var base = {
      "720p": { 10: 1.2, 15: 1.8, 20: 2.2, 25: 2.8, 30: 3.2 },
      "1080p": { 10: 2.0, 15: 3.0, 20: 4.0, 25: 5.0, 30: 6.0 },
      "3mp": { 10: 2.8, 15: 4.0, 20: 5.2, 25: 6.4, 30: 7.5 },
      "2k": { 10: 3.5, 15: 5.0, 20: 6.5, 25: 8.0, 30: 9.5 },
      "4k": { 10: 7.0, 15: 10.0, 20: 13.0, 25: 16.0, 30: 18.0 },
      "8mp": { 10: 8.0, 15: 12.0, 20: 15.0, 25: 18.0, 30: 20.0 },
    };
    var table = base[resolution] || base["1080p"];
    var keys = Object.keys(table).map(Number).sort(function (a, b) { return a - b; });
    var nearest = keys[0];
    keys.forEach(function (k) {
      if (Math.abs(k - fps) < Math.abs(nearest - fps)) nearest = k;
    });
    var mbps = table[nearest];
    var q = { low: 0.7, medium: 1, high: 1.35, ultra: 1.6 };
    mbps *= q[quality] || 1;
    var s = { low: 0.75, medium: 1, high: 1.35, critical: 1.55 };
    mbps *= s[scene] || 1;
    if (codec === "h265") mbps *= 0.55;
    if (codec === "h265+") mbps *= 0.42;
    if (codec === "mjpeg") mbps *= 3.2;
    return mbps;
  }

  function raidUsableFactor(level) {
    // fraction of raw that is usable
    var m = { none: 1, "0": 1, "1": 0.5, "5": 0.8, "6": 0.75, "10": 0.5 };
    return m[level] != null ? m[level] : 1;
  }

  function initSurveillance(root) {
    var form = $("#st-surv-form", root);
    if (!form) return;

    function syncMode() {
      var mode = ($("#surv-bitrate-mode", root) || {}).value || "estimate";
      var est = $("#surv-estimate-fields", root);
      var man = $("#surv-manual-fields", root);
      if (est) est.hidden = mode !== "estimate";
      if (man) man.hidden = mode !== "manual";
    }

    function calc() {
      showErr("surv-error", "");
      var cameras = int($("#surv-cameras", root), 0);
      var hours = Math.min(24, Math.max(0, num($("#surv-hours", root), 24)));
      var days = Math.max(1, int($("#surv-days", root), 30));
      var motion = Math.max(1, Math.min(100, num($("#surv-motion", root), 100)));
      var buffer = Math.max(0, Math.min(100, num($("#surv-buffer", root), 25)));
      var audio = ($("#surv-audio", root) || {}).value === "yes";
      var raid = ($("#surv-raid", root) || {}).value || "none";
      var mode = ($("#surv-bitrate-mode", root) || {}).value || "estimate";
      var mbps;

      if (cameras < 1 || hours <= 0) {
        showErr("surv-error", "Enter cameras (≥1) and hours/day (>0).");
        return;
      }

      if (mode === "manual") {
        mbps = num($("#surv-bitrate", root), 0);
        if (mbps <= 0) {
          showErr("surv-error", "Enter a positive bitrate (Mbps) per camera.");
          return;
        }
      } else {
        mbps = estimateBitrateMbps(
          ($("#surv-resolution", root) || {}).value || "1080p",
          int($("#surv-fps", root), 15),
          ($("#surv-codec", root) || {}).value || "h264",
          ($("#surv-quality", root) || {}).value || "medium",
          ($("#surv-scene", root) || {}).value || "medium"
        );
        setText("surv-est-bitrate", fmt(mbps, 2) + " Mbps / camera");
      }
      if (audio) mbps += 0.064; // ~64 kbps audio track

      var bytesPerCamDay = mbps * 1e6 * 0.125 * hours * 3600 * (motion / 100);
      var totalBytes = bytesPerCamDay * cameras * days;
      var totalGB = totalBytes / 1e9;
      var totalTB = totalGB / 1000;
      var withBufGB = totalGB * (1 + buffer / 100);
      var withBufTB = withBufGB / 1000;
      var factor = raidUsableFactor(raid);
      var rawNeededTB = factor > 0 ? withBufTB / factor : withBufTB;
      var throughputMbps = mbps * cameras * (motion / 100);

      setText("surv-total-gb", fmt(totalGB, 1) + " GB");
      setText("surv-total-tb", fmt(totalTB, 2) + " TB");
      setText("surv-buffer-gb", fmt(withBufGB, 1) + " GB");
      setText("surv-buffer-tb", fmt(withBufTB, 2) + " TB");
      setText("surv-per-cam", fmt(totalGB / cameras, 1) + " GB");
      setText("surv-daily", fmt((bytesPerCamDay * cameras) / 1e9, 2) + " GB/day");
      setText("surv-throughput", fmt(throughputMbps, 1) + " Mbps avg");
      setText("surv-raw-raid", fmt(rawNeededTB, 2) + " TB raw" + (raid === "none" ? " (no RAID)" : " for RAID " + raid));

      var driveOpts = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
      var rec = "Multi-drive NVR / server array";
      for (var i = 0; i < driveOpts.length; i++) {
        if (driveOpts[i] >= rawNeededTB) {
          rec = "About 1 × " + driveOpts[i] + " TB raw (before spare slots)";
          break;
        }
      }
      if (rawNeededTB > 22) rec = "About " + Math.ceil(rawNeededTB / 10) + " × 10 TB raw drives (plan RAID + spare)";
      setText("surv-recommend", rec);

      // days of retention if fixed capacity entered
      var capTB = num($("#surv-fixed-cap", root), 0);
      if (capTB > 0 && totalTB > 0) {
        var daysFit = (capTB * 1000) / (totalGB / days);
        setText("surv-days-fit", fmt(daysFit, 1) + " days at current settings");
      } else {
        setText("surv-days-fit", "Enter a fixed capacity below to reverse-calculate days");
      }
    }

    on($("#surv-bitrate-mode", root), "change", function () {
      syncMode();
      calc();
    });
    bindForm(form, calc);
    syncMode();
    calc();
  }

  /* ============================================================
     VM SIZING — multi workload, overcommit, HA, optional storage
     ============================================================ */
  function initVM(root) {
    var form = $("#st-vm-form", root);
    if (!form) return;
    var tbody = $("#vm-workloads", root);

    function addRow(vCPU, ram, count, storage) {
      if (!tbody) return;
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td><input type="number" class="st-tool-input vm-vcpu" min="1" step="1" value="' + (vCPU || 2) + '" aria-label="vCPU"></td>' +
        '<td><input type="number" class="st-tool-input vm-ram" min="0.5" step="0.5" value="' + (ram || 8) + '" aria-label="RAM GB"></td>' +
        '<td><input type="number" class="st-tool-input vm-storage" min="0" step="1" value="' + (storage != null ? storage : 100) + '" aria-label="Storage GB"></td>' +
        '<td><input type="number" class="st-tool-input vm-count" min="0" step="1" value="' + (count || 10) + '" aria-label="Count"></td>' +
        '<td class="st-tool-row-actions"><button type="button" class="st-tool-icon-btn vm-remove" aria-label="Remove">×</button></td>';
      tbody.appendChild(tr);
      $all("input", tr).forEach(function (el) { on(el, "input", calc); });
      on($(".vm-remove", tr), "click", function () {
        if (tbody.children.length <= 1) return;
        tr.remove();
        calc();
      });
    }

    function totals() {
      var vcpu = 0, ram = 0, vms = 0, storage = 0;
      $all("#vm-workloads tr", root).forEach(function (tr) {
        var c = int($(".vm-count", tr), 0);
        vms += c;
        vcpu += c * int($(".vm-vcpu", tr), 0);
        ram += c * num($(".vm-ram", tr), 0);
        storage += c * num($(".vm-storage", tr), 0);
      });
      return { vcpu: vcpu, ram: ram, vms: vms, storage: storage };
    }

    function calc() {
      showErr("vm-error", "");
      var w = totals();
      var sockets = Math.max(1, int($("#vm-sockets", root), 2));
      var cores = Math.max(1, int($("#vm-cores", root), 16));
      var ghz = Math.max(0.1, num($("#vm-ghz", root), 2.4));
      var ht = ($("#vm-ht", root) || {}).value === "yes";
      var hostRam = Math.max(1, num($("#vm-host-ram", root), 512));
      var cpuAlloc = Math.max(10, Math.min(100, num($("#vm-cpu-alloc", root), 80)));
      var memAlloc = Math.max(10, Math.min(100, num($("#vm-mem-alloc", root), 90)));
      var overcommit = Math.max(1, num($("#vm-overcommit", root), 4)); // vCPU per physical core target
      var haReserve = Math.max(0, Math.min(50, num($("#vm-ha", root), 0))); // % hosts reserved
      var hostCpuOh = Math.max(0, num($("#vm-host-cpu-oh", root), 0.05));
      var hostMemOh = Math.max(0, num($("#vm-host-mem-oh", root), 8));
      var vmMemOh = Math.max(0, num($("#vm-vm-mem-oh", root), 0.1));

      if (w.vms < 1) showErr("vm-error", "Add at least one workload with VM count ≥ 1.");

      var physicalCores = sockets * cores;
      var logical = physicalCores * (ht ? 2 : 1);
      // Effective vCPU capacity per host = cores * overcommit * cpuAlloc - overhead cores
      var vcpuPerHost = Math.max(0.1, physicalCores * overcommit * (cpuAlloc / 100) * (1 - hostCpuOh));
      var memPerHost = Math.max(0.1, hostRam * (memAlloc / 100) - hostMemOh);
      var memDemand = w.ram + w.vms * vmMemOh;

      var hostsByCPU = Math.ceil(w.vcpu / vcpuPerHost);
      var hostsByMem = Math.ceil(memDemand / memPerHost);
      var hostsN = w.vms > 0 ? Math.max(1, hostsByCPU, hostsByMem) : 0;
      // HA: need enough hosts so that after losing haReserve% capacity, still fit
      var hostsHA = hostsN;
      if (hostsN > 0 && haReserve > 0) {
        hostsHA = Math.ceil(hostsN / (1 - haReserve / 100));
      }
      var hostsN1 = hostsN > 0 ? hostsN + 1 : 0;
      var finalRec = Math.max(hostsN1, hostsHA);

      setText("vm-total-vcpu", fmt(w.vcpu, 0));
      setText("vm-total-ram", fmt(w.ram, 1) + " GB");
      setText("vm-total-vms", fmt(w.vms, 0));
      setText("vm-total-storage", fmt(w.storage / 1024, 2) + " TB");
      setText("vm-avg-vcpu", w.vms ? fmt(w.vcpu / w.vms, 2) : "—");
      setText("vm-avg-ram", w.vms ? fmt(w.ram / w.vms, 2) + " GB" : "—");
      setText("vm-phys-cores", fmt(physicalCores, 0));
      setText("vm-logical", fmt(logical, 0));
      setText("vm-host-ghz", fmt(physicalCores * ghz, 1) + " GHz");
      setText("vm-cores-avail", fmt(vcpuPerHost, 1) + " vCPU slots");
      setText("vm-mem-avail", fmt(memPerHost, 1) + " GB");
      setText("vm-hosts-n", hostsN ? String(hostsN) : "—");
      setText("vm-hosts-n1", hostsN1 ? String(hostsN1) : "—");
      setText("vm-hosts-ha", hostsHA ? String(hostsHA) : "—");
      setText("vm-hosts-rec", finalRec ? String(finalRec) : "—");
      setText("vm-bound", hostsN ? (hostsByMem >= hostsByCPU ? "Memory-bound" : "CPU-bound") : "—");
      setText("vm-cpu-over", hostsN ? fmt((w.vcpu / (hostsN * physicalCores)) * 100, 1) + "% of physical cores" : "—");
      setText("vm-mem-over", hostsN ? fmt((memDemand / (hostsN * memPerHost)) * 100, 1) + "%" : "—");
      setText("vm-vms-per-host", hostsN ? fmt(w.vms / hostsN, 1) : "—");
      setText(
        "vm-n1-note",
        finalRec
          ? "Recommended cluster size " + finalRec + " hosts (covers N+1 and HA reserve settings)."
          : ""
      );
    }

    on($("#vm-add-row", root), "click", function () {
      addRow(2, 8, 5, 80);
      calc();
    });
    on($("#vm-reset", root), "click", function () {
      if (tbody) tbody.innerHTML = "";
      addRow(2, 8, 20, 100);
      addRow(4, 16, 8, 200);
      addRow(8, 32, 2, 500);
      calc();
    });
    if (tbody && !tbody.children.length) {
      addRow(2, 8, 20, 100);
      addRow(4, 16, 8, 200);
      addRow(8, 32, 2, 500);
    }
    bindForm(form, calc);
    calc();
  }

  /* ============================================================
     PASSWORD — strength + generator + multi + passphrase
     ============================================================ */
  var COMMON = {
    password: 1, password1: 1, password123: 1, 123456: 1, 12345678: 1, qwerty: 1,
    abc123: 1, letmein: 1, welcome: 1, admin: 1, admin123: 1, iloveyou: 1,
    monkey: 1, dragon: 1, master: 1, login: 1, princess: 1, football: 1,
    baseball: 1, sunshine: 1, trustno1: 1, passw0rd: 1, "p@ssw0rd": 1,
  };
  var WORDS = "correct,horse,battery,staple,orchid,lantern,river,canyon,maple,comet,harbor,velvet,signal,pioneer,glacier,ember,falcon,quartz,nectar,summit,timber,willow,zephyr,anchor,breeze,cascade,delta,echo,frost,grove".split(",");

  function charsetSize(opts) {
    var n = 0;
    if (opts.lower) n += 26;
    if (opts.upper) n += 26;
    if (opts.digits) n += 10;
    if (opts.symbols) n += 32;
    if (opts.excludeAmbiguous) {
      if (opts.lower) n -= 1;
      if (opts.upper) n -= 2;
      if (opts.digits) n -= 2;
    }
    return Math.max(n, 1);
  }

  function secureIndex(max) {
    if (window.crypto && crypto.getRandomValues) {
      var arr = new Uint32Array(1);
      var limit = Math.floor(0x100000000 / max) * max;
      do { crypto.getRandomValues(arr); } while (arr[0] >= limit);
      return arr[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function humanDuration(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "—";
    if (seconds < 1) return "Instant";
    if (seconds < 60) return fmt(seconds, 1) + " sec";
    if (seconds < 3600) return fmt(seconds / 60, 1) + " min";
    if (seconds < 86400) return fmt(seconds / 3600, 1) + " hours";
    if (seconds < 86400 * 365) return fmt(seconds / 86400, 1) + " days";
    if (seconds < 86400 * 365 * 1000) return fmt(seconds / (86400 * 365), 1) + " years";
    return "Centuries+";
  }

  function scorePassword(pw) {
    if (!pw) {
      return { score: 0, label: "Empty", entropy: 0, color: "#94a3b8", crack: "—", tips: ["Enter or generate a password."], flags: [] };
    }
    var lower = /[a-z]/.test(pw);
    var upper = /[A-Z]/.test(pw);
    var digits = /[0-9]/.test(pw);
    var symbols = /[^A-Za-z0-9]/.test(pw);
    var size = charsetSize({ lower: lower, upper: upper, digits: digits, symbols: symbols });
    var entropy = pw.length * (Math.log(size) / Math.LN2);
    var flags = [];

    if (COMMON[pw.toLowerCase()]) {
      entropy = Math.min(entropy, 8);
      flags.push("Appears on common-password lists");
    }
    if (/(.)\1{2,}/.test(pw)) { entropy *= 0.85; flags.push("Repeated characters"); }
    if (/^[a-zA-Z]+$/.test(pw) && pw.length < 14) { entropy *= 0.8; flags.push("Letters only"); }
    if (/^[0-9]+$/.test(pw)) { entropy *= 0.45; flags.push("Digits only"); }
    if (/^(?:19|20)\d{2}/.test(pw) || /(?:19|20)\d{2}$/.test(pw)) { entropy *= 0.85; flags.push("Looks year-based"); }
    if (/^[A-Z][a-z]+[0-9]{1,4}!?$/.test(pw)) { entropy *= 0.72; flags.push("Common Name123 pattern"); }
    if (pw.length < 8) flags.push("Shorter than 8 characters");

    var score, label, color;
    if (entropy < 28) { score = 1; label = "Very weak"; color = "#ef4444"; }
    else if (entropy < 45) { score = 2; label = "Weak"; color = "#f97316"; }
    else if (entropy < 60) { score = 3; label = "Fair"; color = "#eab308"; }
    else if (entropy < 80) { score = 4; label = "Strong"; color = "#22c55e"; }
    else { score = 5; label = "Excellent"; color = "#06b6d4"; }

    var crack = humanDuration(Math.pow(2, Math.min(entropy, 120)) / 1e10);
    var tips = [];
    if (pw.length < 14) tips.push("Aim for 14–16+ characters on important accounts.");
    if (!(lower && upper && digits)) tips.push("Mix upper, lower, and digits.");
    if (!symbols) tips.push("Symbols increase entropy when allowed.");
    if (score >= 4) tips.push("Still use unique passwords + MFA everywhere.");
    if (!tips.length) tips.push("Store secrets in a password manager.");

    return { score: score, label: label, entropy: entropy, color: color, crack: crack, tips: tips, flags: flags, charset: size };
  }

  function generatePassword(opts) {
    var lower = opts.excludeAmbiguous ? "abcdefghijkmnopqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
    var upper = opts.excludeAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digits = opts.excludeAmbiguous ? "23456789" : "0123456789";
    var symbols = "!@#$%^&*()-_=+[]{}:,.?";
    if (opts.excludeCustom) {
      var ex = opts.excludeCustom;
      lower = lower.split("").filter(function (c) { return ex.indexOf(c) < 0; }).join("");
      upper = upper.split("").filter(function (c) { return ex.indexOf(c) < 0; }).join("");
      digits = digits.split("").filter(function (c) { return ex.indexOf(c) < 0; }).join("");
      symbols = symbols.split("").filter(function (c) { return ex.indexOf(c) < 0; }).join("");
    }
    if (opts.mode === "passphrase") {
      var count = Math.max(3, Math.min(10, opts.words || 4));
      var parts = [];
      for (var i = 0; i < count; i++) parts.push(WORDS[secureIndex(WORDS.length)]);
      var sep = opts.symbols ? ["-", ".", "_", " "][secureIndex(4)] : "-";
      var phrase = parts.join(sep);
      if (opts.digits) phrase += secureIndex(90) + 10;
      return phrase;
    }
    var pool = "";
    var required = [];
    if (opts.lower) { pool += lower; required.push(lower); }
    if (opts.upper) { pool += upper; required.push(upper); }
    if (opts.digits) { pool += digits; required.push(digits); }
    if (opts.symbols) { pool += symbols; required.push(symbols); }
    if (!pool) pool = lower + upper + digits;
    var len = Math.max(4, Math.min(128, opts.length || 16));
    var chars = [];
    required.forEach(function (set) {
      if (set.length) chars.push(set[secureIndex(set.length)]);
    });
    while (chars.length < len) chars.push(pool[secureIndex(pool.length)]);
    for (var j = chars.length - 1; j > 0; j--) {
      var k = secureIndex(j + 1);
      var t = chars[j]; chars[j] = chars[k]; chars[k] = t;
    }
    return chars.join("");
  }

  function initPassword(root) {
    if (!$("#pw-check", root) && !$("#pw-generated", root)) return;

    function paint(pw) {
      var s = scorePassword(pw);
      setText("pw-label", s.label);
      setText("pw-entropy", fmt(s.entropy, 1) + " bits");
      setText("pw-crack", s.crack);
      setText("pw-charset", s.charset ? String(s.charset) : "—");
      var bar = $("#pw-meter-bar", root);
      if (bar) { bar.style.width = s.score * 20 + "%"; bar.style.background = s.color; }
      var label = $("#pw-label", root);
      if (label) label.style.color = s.color;
      setHTML("pw-tips", s.tips.map(function (t) { return "<li>" + t + "</li>"; }).join(""));
      setHTML(
        "pw-flags",
        s.flags && s.flags.length
          ? s.flags.map(function (f) { return '<span class="st-tool-chip st-tool-chip--warn">' + f + "</span>"; }).join("")
          : '<span class="st-tool-chip">No obvious weak patterns</span>'
      );
    }

    function opts() {
      return {
        length: int($("#pw-len", root), 16),
        words: int($("#pw-words", root), 4),
        lower: ($("#pw-lower", root) || { checked: true }).checked,
        upper: ($("#pw-upper", root) || { checked: true }).checked,
        digits: ($("#pw-digits", root) || { checked: true }).checked,
        symbols: ($("#pw-symbols", root) || { checked: true }).checked,
        excludeAmbiguous: ($("#pw-ambiguous", root) || { checked: true }).checked,
        excludeCustom: (($("#pw-exclude", root) || {}).value || "").trim(),
        mode: ($("#pw-mode", root) || {}).value || "random",
      };
    }

    function syncMode() {
      var mode = ($("#pw-mode", root) || {}).value || "random";
      var rw = $("#pw-random-wrap", root);
      var pw = $("#pw-phrase-wrap", root);
      if (rw) rw.hidden = mode !== "random";
      if (pw) pw.hidden = mode !== "passphrase";
    }

    function doGenerate() {
      var o = opts();
      if (o.mode === "random" && !o.lower && !o.upper && !o.digits && !o.symbols) {
        showErr("pw-error", "Select at least one character set.");
        return;
      }
      showErr("pw-error", "");
      var count = Math.max(1, Math.min(10, int($("#pw-count", root), 1)));
      var list = [];
      for (var i = 0; i < count; i++) list.push(generatePassword(o));
      var primary = list[0];
      if ($("#pw-generated", root)) $("#pw-generated", root).value = primary;
      if ($("#pw-check", root)) $("#pw-check", root).value = primary;
      setHTML(
        "pw-batch",
        list.length > 1
          ? list.map(function (p, idx) {
              return '<div class="st-tool-batch-item"><code>' + p.replace(/</g, "&lt;") + '</code></div>';
            }).join("")
          : ""
      );
      paint(primary);
    }

    on($("#pw-check", root), "input", function () {
      paint(($("#pw-check", root) || {}).value || "");
    });
    on($("#pw-generate", root), "click", doGenerate);
    on($("#pw-mode", root), "change", function () { syncMode(); });
    on($("#pw-copy", root), "click", function () {
      var val = (($("#pw-generated", root) || {}).value) || (($("#pw-check", root) || {}).value) || "";
      if (!val) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(function () {
          setText("pw-copy-status", "Copied");
          setTimeout(function () { setText("pw-copy-status", ""); }, 1500);
        });
      }
    });
    on($("#pw-len", root), "input", function () {
      setText("pw-len-val", String(int($("#pw-len", root), 16)));
    });
    setText("pw-len-val", String(int($("#pw-len", root), 16)));
    syncMode();
    doGenerate();
  }

  /* ============================================================
     RANSOMWARE COST — readiness reduces recovery/downtime costs
     ============================================================ */
  function initRansomware(root) {
    var form = $("#st-ransom-form", root);
    if (!form) return;

    var industryMult = {
      general: 1, healthcare: 1.4, finance: 1.35, legal: 1.25,
      manufacturing: 1.2, professional: 1.08, retail: 1.15, nonprofit: 0.9, government: 1.2,
    };

    function calc() {
      showErr("ransom-error", "");
      var revenue = Math.max(0, num($("#ransom-revenue", root), 0));
      var employees = Math.max(0, int($("#ransom-employees", root), 0));
      var records = Math.max(0, int($("#ransom-records", root), 0));
      var downtimeHrs = Math.max(0, num($("#ransom-downtime", root), 0));
      var recoveryDays = Math.max(0, num($("#ransom-recovery-days", root), 0));
      var ransomDemand = Math.max(0, num($("#ransom-demand", root), 0));
      var hourlyIT = Math.max(0, num($("#ransom-it-rate", root), 200));
      var readiness = Math.max(1, Math.min(5, int($("#ransom-readiness", root), 3)));
      var insurance = Math.max(0, num($("#ransom-insurance", root), 0));
      var industry = ($("#ransom-industry", root) || {}).value || "general";
      var mult = industryMult[industry] || 1;
      // readiness 5 = excellent backups/MFA → lower impact
      var readyFactor = 1.35 - readiness * 0.12; // 1.23 .. 0.75

      if (revenue <= 0 && records <= 0) {
        showErr("ransom-error", "Enter annual revenue and/or sensitive records.");
      }

      var hourlyRevenue = revenue > 0 ? revenue / 2000 : 0;
      var downtimeMid = hourlyRevenue * downtimeHrs * 0.65 * readyFactor;
      var downtimeLow = downtimeMid * 0.55;
      var downtimeHigh = hourlyRevenue * downtimeHrs * 0.95 * Math.min(1.1, readyFactor + 0.15);

      var empHourly = 45;
      var productivityMid = employees * empHourly * downtimeHrs * 0.4 * readyFactor;
      var productivityLow = productivityMid * 0.5;
      var productivityHigh = employees * empHourly * downtimeHrs * 0.7 * Math.min(1.1, readyFactor + 0.1);

      var recoveryHrs = recoveryDays * 8 * Math.max(1, Math.ceil(employees / 50));
      var recoveryMid = recoveryHrs * hourlyIT * 1.3 * readyFactor;
      var recoveryLow = recoveryMid * 0.55;
      var recoveryHigh = recoveryMid * 1.85 + 15000 * readyFactor;

      var perRecord = 165 * mult * (0.85 + readyFactor * 0.15);
      var recordsMid = records * perRecord;
      var recordsLow = records * 80 * mult;
      var recordsHigh = records * 280 * mult;

      var legalMid = ((records > 0 ? 25000 : 5000) * mult + Math.min(records * 2, 100000)) * readyFactor;
      var legalLow = legalMid * 0.45;
      var legalHigh = legalMid * 2.2;

      var repMid = revenue * (0.01 + Math.min(records / 500000, 0.04)) * mult * readyFactor;
      var repLow = repMid * 0.35;
      var repHigh = repMid * 2.5;

      function pack(d, p, r, rec, l, rep, pay) {
        return Math.max(0, d + p + r + rec + l + rep + (pay ? ransomDemand : 0) - (pay ? 0 : 0));
      }

      var low = Math.max(0, pack(downtimeLow, productivityLow, recoveryLow, recordsLow, legalLow, repLow, false) - insurance * 0.1);
      var mid = Math.max(0, pack(downtimeMid, productivityMid, recoveryMid, recordsMid, legalMid, repMid, false) - insurance * 0.25);
      var high = Math.max(0, pack(downtimeHigh, productivityHigh, recoveryHigh, recordsHigh, legalHigh, repHigh, false));
      var midPay = mid + ransomDemand;

      // Expected annualized loss if probability entered
      var pYear = Math.max(0, Math.min(100, num($("#ransom-prob", root), 0))) / 100;
      var eal = mid * pYear;

      setText("ransom-low", fmtMoney(low));
      setText("ransom-mid", fmtMoney(mid));
      setText("ransom-high", fmtMoney(high));
      setText("ransom-mid-pay", fmtMoney(midPay));
      setText("ransom-eal", pYear > 0 ? fmtMoney(eal) + " / year" : "Enter annual probability to estimate");
      setText("ransom-br-downtime", fmtMoney(downtimeMid));
      setText("ransom-br-prod", fmtMoney(productivityMid));
      setText("ransom-br-recovery", fmtMoney(recoveryMid));
      setText("ransom-br-records", fmtMoney(recordsMid));
      setText("ransom-br-legal", fmtMoney(legalMid));
      setText("ransom-br-rep", fmtMoney(repMid));
      setText("ransom-br-ransom", fmtMoney(ransomDemand));
      setText("ransom-ready-note", "Readiness level " + readiness + "/5 scales recovery and downtime costs (better backups & MFA → lower impact).");
      setText(
        "ransom-summary",
        "Mid-range impact ≈ " + fmtMoney(mid) + " without paying ransom (high ≈ " + fmtMoney(high) + "). Prevention is almost always cheaper than recovery."
      );
    }

    on($("#ransom-readiness", root), "input", function () {
      setText("ransom-ready-val", String(int($("#ransom-readiness", root), 3)));
      calc();
    });
    setText("ransom-ready-val", String(int($("#ransom-readiness", root), 3)));
    bindForm(form, calc);
    calc();
  }

  /* ============================================================
     SUBNET CALCULATOR — IPv4 CIDR
     ============================================================ */
  function ipToInt(ip) {
    var p = String(ip).trim().split(".");
    if (p.length !== 4) return null;
    var n = 0;
    for (var i = 0; i < 4; i++) {
      var o = parseInt(p[i], 10);
      if (!isFinite(o) || o < 0 || o > 255) return null;
      n = (n << 8) + o;
    }
    return n >>> 0;
  }
  function intToIp(n) {
    n = n >>> 0;
    return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
  }
  function prefixToMask(prefix) {
    if (prefix <= 0) return 0;
    if (prefix >= 32) return 0xffffffff;
    return (0xffffffff << (32 - prefix)) >>> 0;
  }

  function initSubnet(root) {
    var form = $("#st-subnet-form", root);
    if (!form) return;

    function calc() {
      showErr("subnet-error", "");
      var ipStr = (($("#subnet-ip", root) || {}).value || "192.168.1.0").trim();
      var prefix = int($("#subnet-prefix", root), 24);
      prefix = Math.max(0, Math.min(32, prefix));
      if ($("#subnet-prefix", root)) $("#subnet-prefix", root).value = prefix;
      setText("subnet-prefix-val", String(prefix));

      var ip = ipToInt(ipStr);
      if (ip === null) {
        showErr("subnet-error", "Enter a valid IPv4 address (e.g. 192.168.10.0).");
        return;
      }
      var mask = prefixToMask(prefix);
      var wildcard = (~mask) >>> 0;
      var network = (ip & mask) >>> 0;
      var broadcast = (network | wildcard) >>> 0;
      var hostBits = 32 - prefix;
      var totalAddrs = hostBits >= 31 ? Math.pow(2, hostBits) : Math.pow(2, hostBits);
      var usable = prefix >= 31 ? (prefix === 31 ? 2 : prefix === 32 ? 1 : 0) : totalAddrs - 2;
      var first = prefix >= 31 ? network : (network + 1) >>> 0;
      var last = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;
      if (prefix === 32) { first = network; last = network; usable = 1; }
      if (prefix === 31) { first = network; last = broadcast; usable = 2; }

      var classful = "n/a";
      var a = (network >>> 24) & 255;
      if (a < 128) classful = "A";
      else if (a < 192) classful = "B";
      else if (a < 224) classful = "C";
      else if (a < 240) classful = "D (multicast)";
      else classful = "E (experimental)";

      setText("subnet-network", intToIp(network));
      setText("subnet-broadcast", intToIp(broadcast));
      setText("subnet-mask", intToIp(mask));
      setText("subnet-wildcard", intToIp(wildcard));
      setText("subnet-cidr", intToIp(network) + "/" + prefix);
      setText("subnet-first", intToIp(first));
      setText("subnet-last", intToIp(last));
      setText("subnet-hosts", fmt(usable, 0));
      setText("subnet-total", fmt(totalAddrs, 0));
      setText("subnet-class", classful);
      var bin = mask.toString(2);
      while (bin.length < 32) bin = "0" + bin;
      setText("subnet-binary", bin.replace(/(.{8})/g, "$1 ").trim());

      // Split planner
      var needHosts = int($("#subnet-need-hosts", root), 0);
      var needSubnets = int($("#subnet-need-subnets", root), 0);
      var splitHTML = "";
      if (needHosts > 0) {
        var bits = 0;
        while (Math.pow(2, bits) - 2 < needHosts && bits < 32) bits++;
        var recPrefix = 32 - bits;
        if (recPrefix < prefix) {
          splitHTML += "<p>Need larger network than /" + prefix + " for " + needHosts + " hosts (requires ~/" + recPrefix + ").</p>";
        } else {
          splitHTML += "<p>For ≥" + needHosts + " usable hosts, use <strong>/" + recPrefix + "</strong> (" + (Math.pow(2, 32 - recPrefix) - 2) + " hosts).</p>";
        }
      }
      if (needSubnets > 0) {
        var sb = 0;
        while (Math.pow(2, sb) < needSubnets && sb < 24) sb++;
        var newPref = prefix + sb;
        if (newPref > 30) {
          splitHTML += "<p>Cannot split /" + prefix + " into " + needSubnets + " subnets cleanly.</p>";
        } else {
          splitHTML += "<p>To create " + needSubnets + "+ subnets, borrow " + sb + " bits → <strong>/" + newPref + "</strong> (" + Math.pow(2, sb) + " subnets, " + Math.max(0, Math.pow(2, 32 - newPref) - 2) + " hosts each).</p>";
          var rows = "";
          var count = Math.min(Math.pow(2, sb), 16);
          var block = Math.pow(2, 32 - newPref);
          for (var i = 0; i < count; i++) {
            var net = (network + i * block) >>> 0;
            var bcast = (net + block - 1) >>> 0;
            rows += "<tr><td>" + intToIp(net) + "/" + newPref + "</td><td>" + intToIp((net + 1) >>> 0) + " – " + intToIp((bcast - 1) >>> 0) + "</td><td>" + intToIp(bcast) + "</td></tr>";
          }
          if (Math.pow(2, sb) > 16) rows += "<tr><td colspan='3'>… " + (Math.pow(2, sb) - 16) + " more subnets not shown</td></tr>";
          splitHTML += '<div class="st-tool-table-wrap"><table class="st-tool-table"><thead><tr><th>Subnet</th><th>Usable range</th><th>Broadcast</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
        }
      }
      setHTML("subnet-split", splitHTML || "<p class='st-tool-hint'>Optional: enter hosts or subnet count to plan VLSM-style splits.</p>");
    }

    $all(".subnet-quick", root).forEach(function (btn) {
      on(btn, "click", function () {
        if ($("#subnet-prefix", root)) $("#subnet-prefix", root).value = btn.getAttribute("data-prefix");
        calc();
      });
    });
    bindForm(form, calc);
    calc();
  }

  /* ============================================================
     Email header analyzer — RFC 5322 unfold + auth results
     ============================================================ */
  var SAMPLE_HEADERS_PASS =
    "Delivered-To: jane@example.com\n" +
    "Return-Path: <billing@example.com>\n" +
    "Received: from mail.example.com (mail.example.com [203.0.113.10])\n" +
    "\tby mx.google.com with ESMTPS id abc123\n" +
    "\tfor <jane@example.com>; Fri, 14 Aug 2026 10:04:12 -0700\n" +
    "Received: from internal.example.com (internal.example.com [192.0.2.20])\n" +
    "\tby mail.example.com with ESMTP id xyz789; Fri, 14 Aug 2026 10:04:01 -0700\n" +
    "Authentication-Results: mx.google.com;\n" +
    "       dkim=pass header.d=example.com header.s=selector1;\n" +
    "       spf=pass (google.com: domain of billing@example.com designates 203.0.113.10 as permitted sender) smtp.mailfrom=billing@example.com;\n" +
    "       dmarc=pass (p=REJECT sp=REJECT) header.from=example.com\n" +
    "Received-SPF: pass (google.com: domain of billing@example.com designates 203.0.113.10 as permitted sender) client-ip=203.0.113.10\n" +
    "DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=example.com; s=selector1; h=from:to:subject:date:message-id;\n" +
    "From: \"Example Billing\" <billing@example.com>\n" +
    "To: Jane Doe <jane@example.com>\n" +
    "Reply-To: billing@example.com\n" +
    "Subject: August invoice\n" +
    "Date: Fri, 14 Aug 2026 10:03:55 -0700\n" +
    "Message-ID: <inv-8891@example.com>\n" +
    "MIME-Version: 1.0\n" +
    "Content-Type: text/plain; charset=\"UTF-8\"\n";

  var SAMPLE_HEADERS_FAIL =
    "Return-Path: <random8821@mail-relay.invalid>\n" +
    "Received: from unknown (unknown [198.51.100.44])\n" +
    "\tby mx.contoso.com with ESMTP; Fri, 14 Aug 2026 09:11:02 -0700\n" +
    "Authentication-Results: mx.contoso.com;\n" +
    "       spf=fail (sender IP is not authorized) smtp.mailfrom=mail-relay.invalid;\n" +
    "       dkim=none;\n" +
    "       dmarc=fail (p=none) header.from=firstnational.example\n" +
    "From: \"First National Wire Desk\" <treasury@firstnational.example>\n" +
    "Reply-To: payments-update@gmail.com\n" +
    "To: ap@contoso.com\n" +
    "Subject: Updated wiring instructions: action required\n" +
    "Date: Fri, 14 Aug 2026 09:10:44 -0700\n";

  function unfoldHeaders(raw) {
    return String(raw || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n[ \t]+/g, " ");
  }

  function parseHeaderFields(raw) {
    var text = unfoldHeaders(raw);
    var headerBlock = text.split(/\n\s*\n/)[0] || "";
    var fields = [];
    headerBlock.split("\n").forEach(function (line) {
      var idx = line.indexOf(":");
      if (idx < 1) return;
      fields.push({
        name: line.slice(0, idx).trim().toLowerCase(),
        value: line.slice(idx + 1).trim(),
      });
    });
    return fields;
  }

  function headerGet(fields, name) {
    var n = name.toLowerCase();
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].name === n) return fields[i].value;
    }
    return "";
  }

  function headerAll(fields, name) {
    var n = name.toLowerCase();
    return fields.filter(function (f) { return f.name === n; }).map(function (f) { return f.value; });
  }

  function parseAuthToken(block, key) {
    if (!block) return "";
    var re = new RegExp("(?:^|[\\s;])" + key + "\\s*=\\s*([a-z0-9-]+)", "i");
    var m = String(block).match(re);
    return m ? m[1].toLowerCase() : "";
  }

  function initHeaders(root) {
    var form = $("#st-headers-form", root);
    var area = $("#headers-raw", root);
    if (!form || !area) return;

    function analyze() {
      var raw = area.value || "";
      showErr("headers-error", "");
      if (!raw.trim()) {
        setText("headers-verdict", "Paste headers to begin");
        setText("headers-spf", "—");
        setText("headers-dkim", "—");
        setText("headers-dmarc", "—");
        setText("headers-hops", "—");
        setText("headers-from", "—");
        setText("headers-return", "—");
        setText("headers-reply", "—");
        setHTML("headers-flags", '<span class="st-tool-chip">Waiting for headers</span>');
        setHTML("headers-path", "Paste headers to list mail hops.");
        return;
      }
      if (!/^[A-Za-z0-9-]+:/m.test(raw)) {
        showErr("headers-error", "That does not look like an email header block. Copy View message details or Show original, not just the body.");
      }

      var fields = parseHeaderFields(raw);
      var auth = headerGet(fields, "authentication-results");
      var receivedSpf = headerGet(fields, "received-spf");
      var from = headerGet(fields, "from");
      var ret = headerGet(fields, "return-path");
      var reply = headerGet(fields, "reply-to");
      var received = headerAll(fields, "received");
      var dkimSig = headerGet(fields, "dkim-signature");

      var spf = parseAuthToken(auth, "spf") || parseAuthToken(receivedSpf, "received-spf") || (receivedSpf ? receivedSpf.split(/\s+/)[0].toLowerCase() : "");
      if (spf === "received-spf") spf = "";
      var dkim = parseAuthToken(auth, "dkim");
      if (!dkim && dkimSig) dkim = "present";
      var dmarc = parseAuthToken(auth, "dmarc");

      var fromDom = emailDomain(from);
      var retDom = emailDomain(ret);
      var replyDom = emailDomain(reply);
      var flags = [];
      var failish = { fail: 1, softfail: 1, temperror: 1, permerror: 1 };

      if (spf && failish[spf]) flags.push({ t: "warn", m: "SPF is " + spf });
      if (dkim && failish[dkim]) flags.push({ t: "warn", m: "DKIM is " + dkim });
      if (dmarc && failish[dmarc]) flags.push({ t: "warn", m: "DMARC is " + dmarc });
      if (!auth) flags.push({ t: "warn", m: "No Authentication-Results line found" });
      if (fromDom && retDom && fromDom !== retDom) flags.push({ t: "warn", m: "From domain does not match Return-Path (" + fromDom + " vs " + retDom + ")" });
      if (fromDom && replyDom && fromDom !== replyDom) flags.push({ t: "warn", m: "Reply-To domain differs from From (" + replyDom + ")" });
      if (/gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|icloud\.com/i.test(from || "") === false &&
          /gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|icloud\.com/i.test(reply || "")) {
        flags.push({ t: "warn", m: "Business-looking From with a free-mail Reply-To" });
      }
      var display = (from.match(/^"?([^"<]+)"?\s*</) || [])[1] || "";
      if (display && /bank|wire|treasury|invoice|payroll|ceo|cfo|president|attorney|counsel/i.test(display) &&
          /gmail\.com|outlook\.com|yahoo\.com|hotmail\.com/i.test(from)) {
        flags.push({ t: "warn", m: "Authority-style display name on a free-mail From address" });
      }
      if (spf === "pass" && dmarc === "pass") flags.push({ t: "ok", m: "SPF and DMARC passed on this copy" });
      if (!flags.length) flags.push({ t: "ok", m: "No obvious header mismatches in this paste" });

      var hardFail = (spf === "fail") || (dmarc === "fail") || (fromDom && retDom && fromDom !== retDom);
      var verdict = !auth && !from
        ? "Could not parse a From or Authentication-Results line"
        : hardFail
          ? "Treat as suspicious until you verify out of band"
          : (spf === "pass" && (dmarc === "pass" || !dmarc))
            ? "Authentication looks aligned. Still verify money requests."
            : "Mixed or incomplete authentication. Read the flags.";

      setText("headers-verdict", verdict);
      setText("headers-spf", spf || "not found");
      setText("headers-dkim", dkim || "not found");
      setText("headers-dmarc", dmarc || "not found");
      setText("headers-hops", String(received.length || 0));
      setText("headers-from", from || "—");
      setText("headers-return", ret || "—");
      setText("headers-reply", reply || "—");
      setHTML(
        "headers-flags",
        flags.map(function (f) {
          return '<span class="st-tool-chip' + (f.t === "warn" ? " st-tool-chip--warn" : "") + '">' + esc(f.m) + "</span>";
        }).join("")
      );
      if (!received.length) {
        setHTML("headers-path", "No Received lines found.");
      } else {
        setHTML(
          "headers-path",
          '<ol class="st-tool-hops">' +
            received.map(function (hop, i) {
              return "<li><strong>Hop " + (i + 1) + "</strong> " + esc(hop.replace(/\s+/g, " ")) + "</li>";
            }).join("") +
            "</ol>"
        );
      }
    }

    on($("#headers-analyze", root), "click", analyze);
    on($("#headers-clear", root), "click", function () {
      area.value = "";
      analyze();
      area.focus();
    });
    on($("#headers-sample-pass", root), "click", function () {
      area.value = SAMPLE_HEADERS_PASS;
      analyze();
    });
    on($("#headers-sample-fail", root), "click", function () {
      area.value = SAMPLE_HEADERS_FAIL;
      analyze();
    });
    on(area, "input", function () {
      if (area.value.trim().length > 40) analyze();
    });
    analyze();
  }

  /* ============================================================
     SPF + DMARC record generator
     Lookup count follows RFC 7208 mechanisms that cause DNS:
     include, a, mx, ptr, exists, redirect. ip4/ip6/all do not count.
     Nested includes cannot be expanded without live DNS.
     ============================================================ */
  function splitTokens(raw) {
    return String(raw || "")
      .split(/[\s,;]+/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  function validDomain(d) {
    return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(d);
  }

  function validIPv4(s) {
    var m = String(s).match(/^(\d{1,3}\.){3}\d{1,3}(\/([0-9]|[12][0-9]|3[0-2]))?$/);
    if (!m) return false;
    return s.split("/")[0].split(".").every(function (o) { return Number(o) >= 0 && Number(o) <= 255; });
  }

  function validIPv6(s) {
    return /^[0-9a-f:]+(\/\d{1,3})?$/i.test(s) && s.indexOf(":") !== -1;
  }

  function initAuthgen(root) {
    var form = $("#st-authgen-form", root);
    if (!form) return;

    function build() {
      var domain = String(($("#auth-domain", root) || {}).value || "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
      var includes = splitTokens(($("#auth-spf-include", root) || {}).value);
      var ip4 = splitTokens(($("#auth-spf-ip4", root) || {}).value);
      var ip6 = splitTokens(($("#auth-spf-ip6", root) || {}).value);
      var useMx = $("#auth-spf-mx", root) && $("#auth-spf-mx", root).checked;
      var useA = $("#auth-spf-a", root) && $("#auth-spf-a", root).checked;
      var all = ($("#auth-spf-all", root) || {}).value || "-all";
      var p = ($("#auth-dmarc-p", root) || {}).value || "none";
      var sp = ($("#auth-dmarc-sp", root) || {}).value || "";
      var rua = String(($("#auth-dmarc-rua", root) || {}).value || "").trim();
      var pct = int($("#auth-dmarc-pct", root), 100);
      var align = ($("#auth-dmarc-align", root) || {}).value || "r";

      showErr("authgen-error", "");
      var notes = [];
      if (!validDomain(domain)) {
        showErr("authgen-error", "Enter a domain like yourfirm.com (no https, no path).");
        setText("auth-spf-out", "—");
        setText("auth-dmarc-out", "—");
        setText("auth-dmarc-host", "—");
        setText("auth-lookups", "—");
        setHTML("auth-notes", "");
        return;
      }

      var badInc = includes.filter(function (x) { return !validDomain(x); });
      var bad4 = ip4.filter(function (x) { return !validIPv4(x); });
      var bad6 = ip6.filter(function (x) { return !validIPv6(x); });
      if (badInc.length) notes.push("Skipped invalid include: " + badInc.join(", "));
      if (bad4.length) notes.push("Skipped invalid IPv4: " + bad4.join(", "));
      if (bad6.length) notes.push("Skipped invalid IPv6: " + bad6.join(", "));
      includes = includes.filter(validDomain);
      ip4 = ip4.filter(validIPv4);
      ip6 = ip6.filter(validIPv6);

      var parts = ["v=spf1"];
      if (useMx) parts.push("mx");
      if (useA) parts.push("a");
      includes.forEach(function (inc) { parts.push("include:" + inc); });
      ip4.forEach(function (ip) { parts.push("ip4:" + ip); });
      ip6.forEach(function (ip) { parts.push("ip6:" + ip); });
      parts.push(all);
      var spf = parts.join(" ");

      var lookups = (useMx ? 1 : 0) + (useA ? 1 : 0) + includes.length;
      if (lookups > 10) notes.push("This record already lists " + lookups + " DNS-using mechanisms. RFC 7208 fails SPF over 10. Nested includes from vendors can add more at lookup time.");
      else if (lookups >= 7) notes.push("Lookup count is " + lookups + " before vendor nesting. Leave headroom. Flatten or drop unused includes if reports stay clean.");
      if (all === "+all") notes.push("+all authorizes the entire internet to send as you. Do not publish this.");
      if (all === "-all" && p === "none") notes.push("Hard fail SPF with DMARC p=none is fine if you have inventoried senders. Watch bounce reports.");
      if (includes.length === 0 && ip4.length === 0 && ip6.length === 0 && !useMx && !useA) notes.push("SPF has no senders besides all. Add your real mail platform before you publish.");

      var ruaAddr = rua;
      if (ruaAddr && ruaAddr.indexOf("@") !== -1 && ruaAddr.indexOf("mailto:") !== 0) ruaAddr = "mailto:" + ruaAddr;
      if (ruaAddr && ruaAddr.indexOf("@") === -1) {
        notes.push("rua should be an email address.");
        ruaAddr = "";
      }
      var dmarcParts = ["v=DMARC1", "p=" + p];
      if (sp) dmarcParts.push("sp=" + sp);
      if (ruaAddr) dmarcParts.push("rua=" + ruaAddr);
      if (pct && pct !== 100) dmarcParts.push("pct=" + Math.min(100, Math.max(1, pct)));
      dmarcParts.push("adkim=" + align);
      dmarcParts.push("aspf=" + align);
      var dmarc = dmarcParts.join("; ");

      if (p === "reject") notes.push("p=reject will drop unauthenticated mail using your From domain. Only do this after reports look clean.");
      if (p === "none") notes.push("p=none is monitor mode. Plan a date to move to quarantine.");

      setText("auth-spf-out", spf);
      setText("auth-dmarc-out", dmarc);
      setText("auth-dmarc-host", "_dmarc." + domain);
      setText("auth-lookups", String(lookups) + " / 10");
      setHTML(
        "auth-notes",
        notes.length
          ? "<ul>" + notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>"
          : "<p>Looks publishable. Confirm DKIM is on in the tenant, then add these TXT records in DNS.</p>"
      );
    }

    bindForm(form, build);
    on($("#auth-copy-spf", root), "click", function () {
      copyText(($("#auth-spf-out", root) || {}).textContent, "auth-copy-status", "SPF copied");
    });
    on($("#auth-copy-dmarc", root), "click", function () {
      copyText(($("#auth-dmarc-out", root) || {}).textContent, "auth-copy-status", "DMARC copied");
    });
    build();
  }

  /* ============================================================
     Cybersecurity risk assessment
     Weights (max 92, scaled to 100):
       MFA 14, backups 14, EDR 10, email auth 10,
       patch 8, privilege 8, phishing 7, IR 7,
       inventory 7, offboarding 7
     ============================================================ */
  function radioVal(root, name) {
    var el = root.querySelector('input[name="' + name + '"]:checked');
    return el ? parseFloat(el.value) : 0;
  }

  function initRisk(root) {
    var form = $("#st-risk-form", root);
    if (!form) return;

    var items = [
      { name: "risk-mfa", max: 14, label: "Turn on MFA for email, VPN, and every admin account" },
      { name: "risk-bak", max: 14, label: "Add an offline or immutable backup and restore it on purpose" },
      { name: "risk-edr", max: 10, label: "Put EDR on laptops and servers, and name who watches alerts" },
      { name: "risk-mail", max: 10, label: "Publish SPF, DKIM, and raise DMARC past p=none" },
      { name: "risk-patch", max: 8, label: "Put servers on a patch calendar with a measured window" },
      { name: "risk-priv", max: 8, label: "Stop daily work on privileged accounts" },
      { name: "risk-phish", max: 7, label: "Give staff a report button and short, recurring training" },
      { name: "risk-ir", max: 7, label: "Write a one-page incident plan and walk through it once" },
      { name: "risk-inv", max: 7, label: "Build a living list of devices and cloud accounts" },
      { name: "risk-off", max: 7, label: "Revoke mail, VPN, and SaaS on the employee's last day" }
    ];
    var maxRaw = items.reduce(function (s, it) { return s + it.max; }, 0);

    function score() {
      var raw = 0;
      var gaps = [];
      items.forEach(function (it) {
        var v = radioVal(root, it.name);
        raw += v;
        var miss = it.max - v;
        if (miss > 0) gaps.push({ miss: miss, pct: miss / it.max, label: it.label });
      });
      gaps.sort(function (a, b) { return b.miss - a.miss || b.pct - a.pct; });
      var scaled = Math.round((raw / maxRaw) * 100);
      var band = scaled < 40 ? "Critical" : scaled < 60 ? "At risk" : scaled < 80 ? "Fair" : "Strong";
      var blurb =
        scaled < 40
          ? "Basics are missing. MFA and recoverable backups beat any new product this month."
          : scaled < 60
            ? "Some controls exist, but a single gap (usually identity or recovery) can still end the week badly."
            : scaled < 80
              ? "The skeleton is there. Close the ranked gaps and rehearse restore and incident steps."
              : "Strong on paper. Confirm restore tests and DMARC are real, not assumed.";

      var industry = num($("#risk-industry", root), 1);
      var size = int($("#risk-size", root), 35);
      var pressure =
        industry >= 1.15
          ? "Higher. Law, health, and finance get spoofed more and have less room for a bad week."
          : size >= 80
            ? "Headcount raises blast radius. Inventory and offboarding matter as much as tools."
            : "Typical SMB pressure. The same ten controls still apply.";

      var bar = $("#risk-bar", root);
      if (bar) {
        bar.style.width = scaled + "%";
        bar.style.background = scaled < 40 ? "#f87171" : scaled < 60 ? "#fbbf24" : scaled < 80 ? "#60a5fa" : "#4ade80";
      }
      setText("risk-score", String(scaled));
      setText("risk-band", band);
      setText("risk-blurb", blurb);
      setText("risk-pressure", pressure);
      setHTML(
        "risk-gaps",
        gaps.length
          ? "<ol>" + gaps.slice(0, 4).map(function (g) { return "<li>" + esc(g.label) + "</li>"; }).join("") + "</ol>"
          : "<p>No gaps in the answers you selected. Verify them against the live tenant before you celebrate.</p>"
      );
    }

    bindForm(form, score);
    score();
  }

  /* ============================================================
     Office bandwidth calculator
     video = employees * (peakPct/100) * mbpsPerStream (each way)
     voip  = extraCalls * 0.1
     cloud = employees * cloudMbps (download-heavy)
     extra = cameras * camMbps (upload) + backupMbps (upload)
     apply headroom to both directions
     Planning rates sit above vendor minimums (Teams / Zoom tables).
     ============================================================ */
  function initBandwidth(root) {
    var form = $("#st-bw-form", root);
    if (!form) return;

    var videoMbps = { audio: 0.1, "720": 1.5, "1080": 2.5 };
    var skus = [
      { d: 50, u: 50, label: "50/50 Mbps" },
      { d: 100, u: 100, label: "100/100 Mbps" },
      { d: 200, u: 200, label: "200/200 Mbps" },
      { d: 300, u: 300, label: "300/300 Mbps" },
      { d: 500, u: 500, label: "500/500 Mbps" },
      { d: 1000, u: 1000, label: "1 Gbps symmetric" },
      { d: 2000, u: 2000, label: "2 Gbps class" }
    ];

    function pickSku(down, up) {
      for (var i = 0; i < skus.length; i++) {
        if (skus[i].d >= down && skus[i].u >= up) return skus[i].label;
      }
      return "Above 2 Gbps: talk to the carrier about a custom handoff";
    }

    function calc() {
      var employees = int($("#bw-employees", root), 0);
      var pct = Math.max(0, Math.min(100, num($("#bw-video-pct", root), 35)));
      var q = ($("#bw-video-q", root) || {}).value || "720";
      var voipN = Math.max(0, int($("#bw-voip", root), 0));
      var cloudEach = Math.max(0, num($("#bw-cloud", root), 1.5));
      var cams = Math.max(0, int($("#bw-cams", root), 0));
      var camMbps = Math.max(0, num($("#bw-cam-mbps", root), 2));
      var backup = Math.max(0, num($("#bw-backup", root), 0));
      var head = Math.max(0, Math.min(80, num($("#bw-headroom", root), 30)));
      setText("bw-video-pct-val", String(pct));
      showErr("bw-error", "");
      if (employees < 1) {
        showErr("bw-error", "Enter at least one person on site at peak.");
        return;
      }
      var streams = employees * (pct / 100);
      var v = videoMbps[q] != null ? videoMbps[q] : 1.5;
      var video = streams * v;
      var voip = voipN * 0.1;
      var cloud = employees * cloudEach;
      var extraUp = cams * camMbps + backup;
      var downRaw = video + voip + cloud;
      var upRaw = video + voip + cloud * 0.35 + extraUp;
      var factor = 1 + head / 100;
      var down = downRaw * factor;
      var up = upRaw * factor;
      setText("bw-down", fmt(down, 0) + " Mbps");
      setText("bw-up", fmt(up, 0) + " Mbps");
      setText("bw-sku", pickSku(down, up));
      setText("bw-br-video", fmt(video, 1) + " Mbps ×2");
      setText("bw-br-voip", fmt(voip, 1) + " Mbps");
      setText("bw-br-cloud", fmt(cloud, 1) + " Mbps");
      setText("bw-br-extra", fmt(extraUp, 1) + " Mbps up");
      setText(
        "bw-note",
        streams >= 1
          ? "About " + fmt(streams, 1) + " concurrent video streams at peak."
          : "No video in this peak. Upload may still be set by backup or cameras."
      );
    }

    on($("#bw-video-pct", root), "input", calc);
    bindForm(form, calc);
    calc();
  }

  /* ============================================================
     IT downtime cost
     hourlyRev = revenue / operatingHours
     lostRev   = hourlyRev * duration * kind
     lostProd  = employees * wage * (prodPct/100) * duration * kind
     recovery  = recoverHours * recoverRate
     total     = lostRev + lostProd + recovery
     kind = 1 planned, 1.35 unplanned
     Not a ransomware model (no ransom, records, legal bands).
     ============================================================ */
  function initDowntime(root) {
    var form = $("#st-dt-form", root);
    if (!form) return;

    function calc() {
      var revenue = Math.max(0, num($("#dt-revenue", root), 0));
      var yearH = Math.max(1, num($("#dt-hours", root), 2000));
      var emp = Math.max(0, int($("#dt-employees", root), 0));
      var wage = Math.max(0, num($("#dt-wage", root), 0));
      var prod = Math.max(0, Math.min(100, num($("#dt-prod", root), 70))) / 100;
      var dur = Math.max(0, num($("#dt-duration", root), 0));
      var recH = Math.max(0, num($("#dt-recover-h", root), 0));
      var recR = Math.max(0, num($("#dt-recover-r", root), 0));
      var kind = num($("#dt-kind", root), 1);
      if (kind <= 0) kind = 1;
      showErr("dt-error", "");
      if (revenue <= 0 && emp <= 0) {
        showErr("dt-error", "Enter revenue and/or people blocked.");
      }
      var hourlyRev = revenue / yearH;
      var lostRev = hourlyRev * dur * kind;
      var lostProd = emp * wage * prod * dur * kind;
      var recovery = recH * recR;
      var total = lostRev + lostProd + recovery;
      var perHour = dur > 0 ? total / dur : 0;
      setText("dt-total", fmtMoney(total));
      setText("dt-hourly", fmtMoney(perHour) + " / hr");
      setText("dt-rev-hr", fmtMoney(hourlyRev));
      setText("dt-br-rev", fmtMoney(lostRev));
      setText("dt-br-prod", fmtMoney(lostProd));
      setText("dt-br-rec", fmtMoney(recovery));
      setText(
        "dt-note",
        kind > 1
          ? "Unplanned factor 1.35× applied to revenue and productivity. Recovery labor is actual hours."
          : "Planned window: no chaos factor. Recovery is still real labor."
      );
    }

    bindForm(form, calc);
    calc();
  }

  function boot() {
    var root = document.querySelector("[data-tool]") || document;
    var id = (root.getAttribute && root.getAttribute("data-tool")) || "";
    if (!id) return;
    if (id === "raid") initRAID(root);
    if (id === "surveillance") initSurveillance(root);
    if (id === "vm") initVM(root);
    if (id === "password") initPassword(root);
    if (id === "ransomware") initRansomware(root);
    if (id === "subnet") initSubnet(root);
    if (id === "headers") initHeaders(root);
    if (id === "authgen") initAuthgen(root);
    if (id === "risk") initRisk(root);
    if (id === "bandwidth") initBandwidth(root);
    if (id === "downtime") initDowntime(root);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
