import Link from 'next/link'
import axios from 'axios'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import ListQuestion from '../components/list-questions'

const Index = ({ data }) => {
  return (
    <Layout>
      <PageHeader title="Вопросы для интервью по специальности Data Science">
        <div className="suggest">
          <Link href="/add-question"><a className="button is-primary">Предложить вопрос</a></Link>
          <p>Наша цель -  превратить собеседовние в комфортный процесс и облегчить подготовку к нему. Внеси вклад в сообщество, поделись своими вопросами</p>
        </div>
        <style jsx>{`
        .suggest {
          display: flex;
          align-items: center;
          position: relative;
        }
        .suggest .button {
          padding: 28px 15px;
          font-size: 18px;
        }
        .suggest p {
          padding-left: 1em;
        }
        `}
        </style>
      </PageHeader>
      <section>
        <ListQuestion {...data} />
      </section>
    </Layout>
  )
}

// <Link href="/users/[id]" as="/users/1">User</Link>
Index.getInitialProps = async ({ query }) => {
  const APP_URL = process.env.APP_URL
  const response = await axios.get(`${APP_URL}/api/questions`)
  const { data } = response.data
  return {
    data,
    query
  }
}
export default Index
