export default (value) => {
  return value !== '' && (typeof value === 'number' || typeof value === 'string');
}
