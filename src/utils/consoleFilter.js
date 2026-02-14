// Filter out browser extension errors and other non-critical console warnings
// Add this to your main.jsx to clean up console output

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// List of known browser extension errors to ignore
const ignoredErrors = [
  'E.C.P is not enabled',
  'enable_copy.js',
  'Unchecked runtime.lastError: The message port closed before a response was received',
  'React Router Future Flag Warning', // We've fixed this, but ignore any remaining
];

const ignoredWarnings = [
  'React Router Future Flag Warning', // Already fixed
];

console.error = (...args) => {
  const message = args.join(' ');
  if (!ignoredErrors.some(ignored => message.includes(ignored))) {
    originalConsoleError.apply(console, args);
  }
};

console.warn = (...args) => {
  const message = args.join(' ');
  if (!ignoredWarnings.some(ignored => message.includes(ignored))) {
    originalConsoleWarn.apply(console, args);
  }
};