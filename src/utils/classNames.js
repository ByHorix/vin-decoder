export default (...args) => args.reduce((acc, arg) => {
  if (arg instanceof Object) {
    const [[className, predicate]] = Object.entries(arg);

    return `${acc} ${predicate ? className : ''}`;
  }

  return `${acc} ${arg}`;
}, '');