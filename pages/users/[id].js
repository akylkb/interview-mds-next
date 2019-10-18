import Layout from '../../components/layout'
import PageHeader from '../../components/page-header'
import Developed from '../../components/developed'

const User = ({ query }) => {
  return (
    <Layout>
      <PageHeader title={`Профиль ${query.id}`} />
      <Developed />
    </Layout>
  )
}

User.getInitialProps = async ({ query }) => {
  return {
    query
  }
}

export default User
