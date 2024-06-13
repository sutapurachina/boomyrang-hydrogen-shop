import {
    Link as RemixLink,
    NavLink as RemixNavLink
  } from '@remix-run/react';
  import { usePrefixPathWithLocale } from '@/lib/utils';
  
  export function Link(props: any) {
    const {to, className, ...resOfProps} = props;
    let toWithLocale = to;
    const prefix = usePrefixPathWithLocale(to);
  
    if (typeof to === 'string') {
      toWithLocale = prefix;
    }
  
    if (typeof className === 'function') {
        toWithLocale = prefix;
      return (
        <RemixNavLink
          to={toWithLocale}
          className={className}
          {...resOfProps}
        />
      );
    }
  
    return (
      <RemixLink to={toWithLocale} className={className} {...resOfProps} />
    );
  }