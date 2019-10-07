import axios from 'axios'
import {useState} from 'react'

export default () => {
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        axios.post('/login', formData)
            .then(res => {
                alert(res.data)
            })
            .catch(console.err)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" required />
            <input name="password" type="password" required />
            <button disabled={loading}>submit</button>
        </form>
    )
}