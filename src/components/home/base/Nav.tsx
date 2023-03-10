import { Buttons } from './'

interface NavProps {
  setSectionHandler: (section: string) => void
}

export const Nav = ({ setSectionHandler }: NavProps): JSX.Element => {
  interface Menu {
    name: string
    src: string
  }
  const menu: Menu[] = [
    {
      name: 'Menu',
      src: './assets/icons/menu.svg'
    },
    {
      name: 'Projects',
      src: './assets/icons/explorer.svg'
    },
    {
      name: 'Git',
      src: './assets/icons/git-branch.svg'
    },
    {
      name: 'Extensions',
      src: './assets/icons/extensions.svg'
    }
  ]
  return (
    <nav>
      {menu.map((item) => {
        const { name, src } = item
        return (
          <Buttons
            key={Math.random()}
            BProps={{ src, name, handleClick: () => setSectionHandler(name) }}
          />
        )
      })}
    </nav>
  )
}
