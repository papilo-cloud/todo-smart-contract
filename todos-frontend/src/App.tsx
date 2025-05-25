import { useAccount, useConnect, useDisconnect } from 'wagmi'
import CreateTodoForm from './CreateTodoForm'
import UpdateTodoForm from './UpdateTodoForm'
import DeleteTodoForm from './DeleteTodoForm'


function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
        <div className='card'>
          <CreateTodoForm />
        </div>
        <div className="card">
          <UpdateTodoForm />
        </div>
        <div className="card">
          <DeleteTodoForm />
        </div>
      </div>
    </>
  )
}

export default App
