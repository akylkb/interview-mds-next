import Link from 'next/link'
import axios from 'axios'
import Layout from '../components/layout'
import PageHeader from '../components/page-header'
import ListQuestions from '../components/list-questions'

const Index = ({ data, query }) => {
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
          font-size: 18px;
        }

        @media screen and (max-width: 600px) {
          .suggest {
            display: block;
          }
          .suggest p {
            padding-top: 1em;
            padding-left: 0;
          }
          .suggest .button {
            width: 100%;
          }
        }
        `}
        </style>
      </PageHeader>
      <section>
        <ListQuestions {...data} query={query} />
      </section>
    </Layout>
  )
}

// <Link href="/users/[id]" as="/users/1">User</Link>
Index.getInitialProps = async ({ query }) => {
  const APP_URL = process.env.APP_URL
  const response = await axios.get(`${APP_URL}/api/questions`, {
    params: query
  })
  const { data } = response.data
  return {
    data,
    query
  }
}
export default Index
