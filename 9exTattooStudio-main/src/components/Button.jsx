import React from 'react';
import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 font-data text-[11px] tracking-widest2 uppercase px-7 py-4 transition-colors duration-200';

const variants = {
  primary: 'bg-brass text-ink hover:bg-brass-bright',
  outline: 'border border-paper/30 text-paper hover:border-brass-bright hover:text-brass-bright',
  ghost: 'text-paper hover:text-brass-bright',
};

export default function Button({ to, href, variant = 'primary', children, className = '', ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
