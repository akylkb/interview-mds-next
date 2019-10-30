import axios from 'axios'
import Link from 'next/link'
import Layout from '../../components/layout'
import Box from '../../components/box'
import Avatar from '../../components/avatar'
import NotFound from '../../components/not-found'
import InformationTab from '../../components/profile/information-tab'
import QuestionsTab from '../../components/profile/questions-tab'
import CommentsTab from '../../components/profile/comments-tab'

const tabs = [
  {
    name: 'information',
    label: 'Информация',
    component: InformationTab
  },
  {
    name: 'questions',
    label: 'Вопросы',
    component: QuestionsTab
  },
  {
    name: 'comments',
    label: 'Комментарии',
    component: CommentsTab
  }
]

const User = ({ query, user, tabData }) => {
  if (!user) {
    return (
      <Layout>
        <NotFound />
      </Layout>
    )
  }

  const currentTab = query.tab || 'information'
  const renderTab = (tabs, selectedName, props = {}) => {
    const { component: Component } = tabs.find(tab => tab.name === selectedName) || {}
    return Component && <Component {...props} />
  }

  return (
    <Layout>
      <Box>
        <div style={{ textAlign: 'center', marginTop: '5vh' }}>
          <Avatar
            id={user.id}
            image={user.avatar}
            size={100}
            starSize={18}
            rating={user.rating}
          />
          <h2 className="title is-2">{user.name}</h2>
          {user.description && <p>{user.description}</p>}
        </div>
      </Box>
      <div className="tabs is-centered">
        <ul>
          {tabs.map((tab, index) =>
            <li
              key={index}
              className={currentTab === tab.name ? 'is-active' : ''}
            >
              <Link href={`/users/${user.id}?tab=${tab.name}`}>
                <a>{tab.label}</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
      {renderTab(tabs, currentTab, { data: tabData, user })}
    </Layout>
  )
}

User.getInitialProps = async ({ query }) => {
  try {
    const APP_URL = process.env.APP_URL
    const { id } = query
    const response = await axios.get(`${APP_URL}/api/users/${id}`)
    const { data: user } = response.data
    let tabData = null
    try {
      let tabResponse = null
      switch (query.tab) {
        case 'questions':
          tabResponse = await axios.get(`${APP_URL}/api/questions?user=${id}`)
          tabData = tabResponse.data
          break
        case 'comments':
          tabResponse = await axios.get(`${APP_URL}/api/users/${id}/comments`)
          tabData = tabResponse.data
          break
        default:
        case 'information':
          tabResponse = await axios.get(`${APP_URL}/api/users/${id}/info`)
          tabData = tabResponse.data
          break
      }
    } catch (err) {
      console.error(err)
    }

    return {
      user,
      query,
      tabData
    }
  } catch (err) {
    return {
      query
    }
  }
}

export default User
