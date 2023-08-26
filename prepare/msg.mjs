const msg = (s, code) => {
  if (!s) return;
  console.log(`\x1b[${code}m%s\x1b[0m`, s)
};

const _ = {
  success: (s) => msg(s, '32;1'), // Green
  info: (s) => msg(s, '36;1'), // Blue
  log: (s) => msg(s, '37;1'), // White
  note: (s) => msg(s, '90;1'), // Gray
  warn: (s) => msg(s, '33;1'), // Yellow
  error: (s, err) => {
    msg(s, '31;1'); // Red
    if (err) {
      console.log(err);
      process.exit(1);
    }  
  }
}

export default _;