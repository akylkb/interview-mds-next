import axios from 'axios'

const User = ({show}) => {
    
    return (
        <>
        <article>
            <h1>{show.name}</h1>
        </article>
        <style jsx>{`
            h1 {
                font-size: 34px;
                font-weight: bold;
                color: blue;
            }    
        `}</style>
        </>
    )
}

User.getInitialProps = async context => {
    const { id } = context.query
    const res = await axios.get(`${process.env.API_URL}/users/${id}`)
    const show = res.data
    return {
        show
    }
}

export default User