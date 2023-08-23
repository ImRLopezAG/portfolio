interface RolesProps {
  name: string
  color: string
}

export const Role: React.FC<RolesProps> = ({ name, color }) => {
  return (
    <div className='bg-zinc-700/70 flex flex-row items-center align-baseline gap-2 py-1 px-2 rounded-md hover:bg-zinc-700/100 scale-up-top'>
      <span className={`h-3 w-3 ${color} rounded-full`} />
      <span className='text-sm font-bold'>{name}</span>
    </div>
  )
}
