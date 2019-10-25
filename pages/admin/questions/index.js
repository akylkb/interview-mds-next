import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Layout from '../../../components/layout'
import PageHeader from '../../../components/page-header'
import Pagination from '../../../components/pagination'

const TableItem = ({
  id,
  title,
  user,
  level,
  active: initialActive,
  onDelete = f => f
}) => {
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(initialActive)

  const handleClickActive = () => {
    setLoading(true)
    axios.put(`/api/admin/questions/${id}`, { active: !active })
      .then(() => setActive(!active))
      .catch(err => {
        window.alert('Не удалось активировать')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  const handleClickDelete = () => {
    setLoading(true)
    axios.delete(`/api/admin/questions/${id}`)
      .then(() => onDelete())
      .catch(err => {
        window.alert('Не удалось удалить')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  return (
    <tr className={loading ? 'is-selected' : ''}>
      <td>
        <a
          onClick={handleClickActive}
          className={`tag ${active ? 'is-success' : 'is-warning'}`}
        >
          {active ? 'Да' : 'Нет'}
        </a>
      </td>
      <td>{level}</td>
      <td>
        <Link href={`/questions/${id}`}>
          <a>{title}</a>
        </Link>
      </td>
      <td>
        <Link href={`/users/${user.id}`}>
          <a>{user.name || 'Noname'}</a>
        </Link>
      </td>
      <td><a onClick={handleClickDelete} className="tag is-danger">Удалить</a></td>
    </tr>
  )
}

const AdminQuestions = ({ data }) => {
  const [items, setItems] = useState(data.items)
  const { pageCount, page } = data.pagination

  const removeItem = (id) => {
    const updated = items.filter(item => item.id !== id)
    setItems(updated)
  }

  return (
    <Layout>
      <PageHeader title="Модерация вопросов" />
      <section>
        {items.length === 0 && (
          <div className="notification">Нет вопросов</div>
        )}

        {items.length > 0 && (
          <>
            <table className="table is-bordered is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Активен</th>
                  <th>Уровень</th>
                  <th>Заголовок</th>
                  <th>Пользователь</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <TableItem
                    key={item.id}
                    {...item}
                    onDelete={() => removeItem(item.id)}
                  />
                ))}
              </tbody>
            </table>
            <Pagination total={pageCount} current={page} />
          </>
        )}
      </section>
    </Layout>
  )
}

AdminQuestions.getInitialProps = async ({ query, req }) => {
  const APP_URL = process.env.APP_URL
  const response = await axios.get(`${APP_URL}/api/admin/questions`, {
    params: query,
    headers: req ? req.headers : null
  })
  const { data } = response.data
  return {
    data,
    query
  }
}

export default AdminQuestions
