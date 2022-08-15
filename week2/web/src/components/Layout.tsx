const CONTRACT_ADDRESS: string = "0xdC743fb62977B1b3b69459CA9797CDB01e733c31"

type Props = {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return <div className="my-10 mx-auto max-w-2xl">{children}</div>
}

export default Layout
