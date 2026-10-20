
const input = document.getElementById("input");
const output = document.getElementById("output");
const count = document.getElementById("count");
const lines = document.getElementById("lines");
const status = document.getElementById("status");

function generateResult() {
  const raw = input.value.trim();

  const rows = raw === "" ? [] : raw.split(/\r?\n/);

  const serials = rows
    .map(line => line.split(";")[0].trim())
    .filter(serial => serial !== "");

  output.value = serials
    .map(serial => `"${serial}"`)
    .join(",");

  count.textContent = serials.length;
  lines.textContent = rows.length;

  status.textContent = serials.length
    ? "Resultatet har genererats!"
    : "Ingen data att bearbeta.";
}

async function copyResult() {
  if (!output.value) {
    status.textContent = "Det finns inget resultat att kopiera.";
    return;
  }

  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent = "Resultatet har kopierats!";
  } catch {
    output.focus();
    output.select();

    const copied = document.execCommand("copy");

    status.textContent = copied
      ? "Resultatet har kopierats!"
      : "Kopiera resultatet manuellt med Ctrl+C.";
  }
}

function clearAll() {
  input.value = "";
  output.value = "";
  count.textContent = "0";
  lines.textContent = "0";
  status.textContent = "";
}

document.getElementById("generate")
  .addEventListener("click", generateResult);

document.getElementById("copy")
  .addEventListener("click", copyResult);

document.getElementById("clear")
  .addEventListener("click", clearAll);
