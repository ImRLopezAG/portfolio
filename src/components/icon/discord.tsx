interface IconProps {
  className?: string
}

export const DiscordIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={`w-full h-full ${className}`} width='38' height='38' viewBox='0 0 28 20'><path d='M23 2a21 21 0 0 0-5-2l-1 1h-6l-1-1a21 21 0 0 0-5 2 22 22 0 0 0-4 15 22 22 0 0 0 7 3l1-2-2-1v-1a15 15 0 0 0 14 0v1l-2 1 1 2a22 22 0 0 0 7-3c0-6-1-11-4-15ZM10 14c-2 0-3-2-3-3l3-3 2 3-2 3Zm8 0-2-3 2-3c2 0 3 2 3 3s-1 3-3 3Z'/></svg>
  )
}

export const ActiveDevIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={`w-full h-full ${className}`} width='38' height='38' fill="none" viewBox="0 0 24 24"><path fill="#2EA967" d="M6.47 4 4 6.47v11.06L6.47 20h11.06L20 17.53V6.47L17.53 4H6.47Zm4.39 12.43H8.65a3.32 3.32 0 0 0-3.32-3.32v-2.22a3.32 3.32 0 0 0 3.32-3.32h2.2c0 1.82-.88 3.42-2.24 4.43a5.51 5.51 0 0 1 2.25 4.43Zm7.8-3.32a3.32 3.32 0 0 0-3.31 3.32h-2.22c0-1.82.9-3.42 2.25-4.43a5.51 5.51 0 0 1-2.25-4.43h2.22a3.32 3.32 0 0 0 3.32 3.32v2.22Z"/></svg>
  )
}

export const ServerBoosterIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={`w-full h-full ${className}`} width='38' height='38' fill='none'><path d='M12 3.3L4.46 7.65v8.7L12 20.71l7.54-4.36v-8.7L12 3.3zm4.93 11.55L12 17.69l-4.92-2.84V9.16L12 6.31l4.93 2.85v5.69z' fill='#FF6BFA'/><path d='M15.69 8.44l-8.62 4.98V9.15l4.92-2.84 3.7 2.13zM16.93 9.15v1.52L8.4 15.61l-1.32-.77 9.85-5.69zM9.62 16.31l7.31-4.22v2.75l-4.94 2.86-2.37-1.39z' fill='#FFDEF9'/><path d='M12 3.29v3.02l4.93 2.84 2.61-1.5L12 3.29z' fill='#FFB0FF'/><path d='M7.07 14.85l-2.61 1.5L12 20.71v-3.02l-4.93-2.84z' fill='#E34BD1'/><path d='M16.93 9.15l-1.24-.71-8.62 4.98v1.43l9.86-5.7zM16.93 10.67v1.42l-7.31 4.22-1.22-.7 8.53-4.94z' fill='#fff'/></svg>
  )
}

export const HypeSquadIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={`w-full h-full ${className}`} width='38' height='38' viewBox="0 0 30 32"><path fill="#9c84ef" d="M29 .3H.7a.4.4 0 0 0-.4.4v19.6a.5.5 0 0 0 .2.4l14.2 11a.4.4 0 0 0 .5 0l14.3-11a.4.4 0 0 0 .1-.4V.7a.4.4 0 0 0-.4-.4zm-4 8.9-3.3 6.6a.2.2 0 0 0 .1.3H24a.2.2 0 0 1 .3.1.2.2 0 0 1-.1.3L15 23.1a.2.2 0 0 1-.3 0l-9.2-6.5a.2.2 0 0 1-.1-.3.2.2 0 0 1 .3-.1h2a.3.3 0 0 0 .2-.3.2.2 0 0 0 0-.1L4.6 9.2a.2.2 0 0 1 .1-.3.2.2 0 0 1 .3 0l8 5.3a1.1 1.1 0 0 1 .4.4l1.2 2.5a.3.3 0 0 0 .4 0l1.3-2.5a1.1 1.1 0 0 1 .3-.4L24.8 9a.3.3 0 0 1 .3 0 .3.3 0 0 1 0 .2z"/></svg>
  )
}

export const HyperSquadEventIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={`w-full h-full ${className}`} width='38' height='38' viewBox="0 0 32 32"><path fill="#fbb848" d="M31.43 8.79 18.77 17.1a1.47 1.47 0 0 0-.51.57l-1.93 3.87a.36.36 0 0 1-.66 0l-1.93-3.87a1.47 1.47 0 0 0-.51-.57L.57 8.79a.37.37 0 0 0-.57.48l5.29 10.29a.38.38 0 0 1-.29.54H1.82a.37.37 0 0 0-.22.67l14.18 10.16a.39.39 0 0 0 .44 0L30.4 20.77a.37.37 0 0 0-.22-.67H27a.38.38 0 0 1-.33-.54L32 9.27a.37.37 0 0 0-.57-.48z"/><path fill="#fbb848" d="m16.28 1.17 1.3 2.65a.33.33 0 0 0 .23.17l2.93.42a.31.31 0 0 1 .17.53L18.79 7a.33.33 0 0 0-.09.27l.5 2.91a.3.3 0 0 1-.44.32l-2.62-1.37a.28.28 0 0 0-.28 0l-2.62 1.37a.3.3 0 0 1-.44-.32l.5-2.91a.33.33 0 0 0-.09-.27l-2.12-2.06a.31.31 0 0 1 .17-.53L14.19 4a.33.33 0 0 0 .23-.17l1.3-2.65a.31.31 0 0 1 .56-.01z"/></svg>
  )
}

export const ServerOwnerIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={`w-full h-full ${className}`} width='38' height='38' viewBox="0 0 15 15"><path fill="#faa61a" d="M13.66 5.43a.67.67 0 0 1 .99.73L13.3 11.5a.67.67 0 0 1-.64.51H3.33a.67.67 0 0 1-.64-.5L1.35 6.16a.67.67 0 0 1 .25-.7.67.67 0 0 1 .74-.03l2.8 1.67 2.3-3.47a.22.22 0 0 1 .07-.05l.03-.03-.64-.65a.34.34 0 0 1 0-.47l.86-.86a.33.33 0 0 1 .47 0l.87.86c.13.13.13.34 0 .47l-.64.65.04.03a.22.22 0 0 1 .05.05l2.32 3.47 2.79-1.67zm-11 7.24h10.67V14H2.67v-1.33z"/></svg>
  )
}

export const NitroIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg className={`w-full h-full ${className}`} width='38' height='38' viewBox='0 0 15 15' ><defs><path id="prefix__a" d="M0 0h42v32H0z"/><path id="prefix__c" d="M0 .095V3.02h3.798V.095H0z"/><path id="prefix__e" d="M.136 29.681h36.961V.307H.136z"/></defs><g fill="none" fillRule="evenodd"><mask id="prefix__b" fill="#fff"><use /></mask><g transform="translate(0 1)" mask="url(#prefix__b)"><g transform="translate(0 7.671)"><mask id="prefix__d" fill="#fff"><use /></mask><path fill="#4F5D7F" d="M3.798 1.557C3.798.76 3.12.095 2.306.095h-.814C.678.095 0 .76 0 1.557 0 2.355.678 3.02 1.492 3.02h.814c.814 0 1.492-.665 1.492-1.463" mask="url(#prefix__d)"/></g><g transform="translate(4.884 .012)"><mask id="prefix__f" fill="#fff"><use /></mask><path fill="#4F5D7F" d="M35.678 8.818C33.236 3.632 28.081.573 22.655.308H7.325C5.97.307 5.02 1.37 5.02 2.567c0 1.33 1.086 2.26 2.307 2.26h3.934c.814 0 1.492.665 1.492 1.463s-.678 1.463-1.492 1.463H1.628c-.814 0-1.492.665-1.492 1.463s.678 1.463 1.492 1.463h6.919c.814 0 1.492.665 1.492 1.463 0 .797-.678 1.462-1.492 1.462H4.205c-.814 0-1.492.665-1.492 1.463s.678 1.463 1.492 1.463H7.19a13.924 13.924 0 001.22 4.654c3.392 7.314 12.346 10.505 19.807 7.18 7.732-3.456 10.988-12.233 7.461-19.547" mask="url(#prefix__f)"/></g><path fill="#ECEFF8" d="M23.417 7.363c4.29-1.931 9.364-.087 11.334 4.118 1.97 4.204.09 9.178-4.2 11.11-4.29 1.93-9.364.086-11.334-4.119-1.97-4.204-.09-9.178 4.2-11.11"/><path fill="#B7C2CE" d="M30.252 10.16l2.713 4.52c.136.267.136.4 0 .666l-2.713 4.521c-.136.266-.407.266-.543.266h-5.29c-.272 0-.407-.133-.543-.266l-2.713-4.521c-.136-.266-.136-.4 0-.665l2.713-4.521c.136-.266.407-.266.543-.266h5.29c.272-.133.407 0 .543.266"/></g></g></svg>
  )
}
