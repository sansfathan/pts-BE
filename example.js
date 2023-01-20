function bilangan(value) {
  if (value % 2 === 0) {
    return `${value} adalah bilanagn genap`;
  } else {
    return `${value} adalah bilangan ganjil`;
  }
}

const smk = "SMK madinatul Quran";
module.exports = { smk, bilangan };
