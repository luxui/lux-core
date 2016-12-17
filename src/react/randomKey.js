function randomKey() {

  return `radnomKey_${Math.random().toString(32).slice(2)}`;
}

export default randomKey;
