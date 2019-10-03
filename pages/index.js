import Link from 'next/link'
import axios from 'axios'

const Index = ({ shows, title = 'Default title' }) => (
    <div>
        <h1>{title}</h1>
        <ul>
            {shows.map(show => (
                <li key={show.id}>
                    <Link href="/users/[id]" as={`/users/${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
)

Index.getInitialProps = async ({ query }) => {
    
    const response = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
    const data = response.data
    console.log('Shows length', data.length)
    return {
        shows: data.map(entry => {
            const {id, name, type} = entry.show
            return {id, name, type}
        }),
        ...query
    }
}
export default Index