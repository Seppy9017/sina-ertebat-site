// Icon set — kept minimal and line-based to match the control-room / rack-unit
// aesthetic. All icons inherit color via currentColor so they can be themed
// per-context (amber on dark panels, dim on light backgrounds, etc).

const Icon = ({ children, size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`icon ${className}`}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export function CameraIcon(props) {
  return (
    <Icon {...props}>
      <rect x="2" y="7" width="14" height="10" rx="2" />
      <path d="M16 10.5 21.5 8v8L16 13.5" />
      <circle cx="7.5" cy="12" r="2.2" />
    </Icon>
  );
}

export function UpsIcon(props) {
  return (
    <Icon {...props}>
      <rect x="4" y="3" width="10" height="18" rx="1.5" />
      <path d="M9 3V1.3M9 22.7V21" />
      <path d="M10.5 8 7.5 12.5H10L8.5 16" />
      <path d="M17 7v10M14.5 9.5h5M14.5 14.5h5" />
    </Icon>
  );
}

export function BulbIcon(props) {
  return (
    <Icon {...props}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.4 10.9c.6.44.9 1.15.9 1.9V16h5v-.2c0-.75.3-1.46.9-1.9A6 6 0 0 0 12 3Z" />
    </Icon>
  );
}

export function DotIcon({ color = "var(--accent-green)", size = 8 }) {
  return (
    <span
      className="status-dot"
      style={{ width: size, height: size, background: color }}
      aria-hidden="true"
    />
  );
}

export function CartIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
      <path d="M2.5 3h2.2l2 12.2a2 2 0 0 0 2 1.7h8.1a2 2 0 0 0 2-1.6L21 8H6" />
    </Icon>
  );
}

export function CheckIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 12.5 9.5 18 20 6" />
    </Icon>
  );
}

export function PhoneIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4.5 4.5c-.6 3.6.7 8 3.6 10.9s7.3 4.2 10.9 3.6l.6-3.4-4-1.6-1.4 1.7a10.6 10.6 0 0 1-5.9-5.9l1.7-1.4-1.6-4-3.4.6Z" />
    </Icon>
  );
}

export function MailIcon(props) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 6.5 12 13l9-6.5" />
    </Icon>
  );
}

export function PinIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-6.6 7-11.8A7 7 0 0 0 5 9.2C5 14.4 12 21 12 21Z" />
      <circle cx="12" cy="9.3" r="2.4" />
    </Icon>
  );
}

export function MenuIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Icon>
  );
}

export function CloseIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5 5l14 14M19 5 5 19" />
    </Icon>
  );
}

export function ChevronIcon(props) {
  return (
    <Icon {...props}>
      <path d="M15 6 9 12l6 6" />
    </Icon>
  );
}

export function ShieldIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 3 4.5 6v5.6c0 4.6 3.2 7.8 7.5 9.4 4.3-1.6 7.5-4.8 7.5-9.4V6L12 3Z" />
      <path d="M9 12.3l2.1 2.1L15.5 10" />
    </Icon>
  );
}

export function ToolsIcon(props) {
  return (
    <Icon {...props}>
      <path d="M14.7 6.3a3.5 3.5 0 0 0 4.9 4.9L13 17.8l-3-3 6.5-6.5Z" />
      <path d="M9 15 5.5 18.5a1.8 1.8 0 1 0 2.5 2.5L11.5 17.5" />
    </Icon>
  );
}

export function ClockIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Icon>
  );
}

export function SignalIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 3v6" />
      <circle cx="12" cy="3" r="1.4" fill="currentColor" stroke="none" />
      <path d="M8.5 12.5a5 5 0 0 1 7 0" />
      <path d="M5.7 9.7a9 9 0 0 1 12.6 0" />
      <path d="M12 15.5v.1" strokeWidth="2.4" />
      <path d="M4 21h16" />
    </Icon>
  );
}

export function UserIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </Icon>
  );
}

export function BatteryIcon(props) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="8" width="16" height="8" rx="1.5" />
      <path d="M21 10.5v3" />
      <path d="M6 11v2M9.5 11v2M13 11v2" />
    </Icon>
  );
}
