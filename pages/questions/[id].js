import { useState, useContext } from 'react'
import axios from 'axios'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { faComment, faHeart, faPen } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/layout'
import PageHeader from '../../components/page-header'
import Box from '../../components/box'
import Avatar from '../../components/avatar'
import Icon from '../../components/icon'
import ListComments from '../../components/list-comments'
import Editor from '../../components/editor'
import Spinner from '../../components/spinner'
import NotFound from '../../components/not-found'
import { UserContext } from '../../components/user-context'
import Link from 'next/link'
import WithCode from '../../components/with-code'

const QuestionDetails = ({ question, comments: initialComments = [] }) => {
  if (!question.id) {
    return (
      <Layout>
        <NotFound />
      </Layout>
    )
  }

  const {
    id,
    title,
    description,
    user,
    comments_count: commentsCount
  } = question
  const [currentUser] = useContext(UserContext)
  const [likes, setLikes] = useState(question.likes_count)
  const [fetchingLike, setFetchingLike] = useState(false)
  const [comments, setComments] = useState(initialComments)
  const [loadingComments, setLoadingComments] = useState(false)

  const updateComments = () => {
    setLoadingComments(true)
    axios.get(`/api/questions/${id}/comments`)
      .then(response => {
        const { data } = response.data
        setComments(data)
      })
      .catch(console.error)
      .finally(() => {
        setLoadingComments(false)
      })
  }

  const handleClickLike = event => {
    setFetchingLike(true)
    axios.get(`/api/like/question/${id}`)
      .then(response => {
        switch (response.status) {
          case 201:
            setLikes(likes + 1)
            break
          case 202:
            if (likes !== 0) setLikes(likes - 1)
            break
        }
      })
      .catch(console.error)
      .finally(() => setFetchingLike(false))
  }

  const handleClickComments = () => {
    const el = window.document.getElementById('comments')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const onDeleteComment = comment => {
    axios.delete(`/api/admin/comments/${comment.id}`)
      .then(() => {
        const updated = comments.filter(item => item.id !== comment.id)
        setComments(updated)
      })
      .catch(err => {
        window.alert('Не удалось выполнить запрос')
        console.error(err)
      })
  }

  const onMarkComment = comment => {
    axios.put(`/api/admin/comments/${comment.id}`, { marked: !comment.marked })
      .then(() => {
        const updated = comments.map(item => {
          if (item.id !== comment.id) return item
          const isMarked = !item.marked
          return {
            ...item,
            marked: isMarked
          }
        })
        setComments(updated)
      })
      .catch(err => {
        window.alert('Не удалось выполнить запрос')
        console.error(err)
      })
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <PageHeader title={title}>
          {description && (
            <div className="content">
              <WithCode>{description}</WithCode>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Avatar id={user.id} name={user.name} />

            <div className="buttons">
              {currentUser && currentUser.group === 'admin' && (
                <Link href={`/admin/questions/${id}`}>
                  <a className="button is-success">
                    <Icon name={faPen} />
                  </a>
                </Link>
              )}

              <button
                className="button is-primary"
                onClick={handleClickComments}
              >
                <span className="icon"><Icon name={faComment} /></span>
                <span>{commentsCount}</span>
              </button>
              <button
                className={`button is-primary ${fetchingLike ? ' is-loading' : ''}`}
                onClick={handleClickLike}
              >
                <span className="icon"><Icon name={faHeart} /></span>
                <span>{likes}</span>
              </button>
            </div>
          </div>
        </PageHeader>
        <Box>
          <div style={{ marginBottom: 30 }}>
            <h4 className="title is-4">Ваш ответ на вопрос</h4>
            <Editor
              submitURL={`/api/comment/question/${id}`}
              onSuccess={updateComments}
            />
          </div>

          {loadingComments && <Spinner caption="Загрузка комментариев" />}
          {!loadingComments && (
            <ListComments
              comments={comments}
              onDelete={onDeleteComment}
              onMark={onMarkComment}
            />
          )}

        </Box>
      </Layout>
    </>
  )
}

QuestionDetails.getInitialProps = async ({ query }) => {
  try {
    const APP_URL = process.env.APP_URL
    const questionPromise = axios.get(`${APP_URL}/api/questions/${query.id}`)
    const commentsPromise = axios.get(`${APP_URL}/api/questions/${query.id}/comments`)
    const [questionResponse, commentsResponse] = await Promise.all([questionPromise, commentsPromise])

    const { data: question } = questionResponse.data
    const { data: comments } = commentsResponse.data

    return {
      question,
      comments,
      query
    }
  } catch (err) {
    return {
      question: {},
      comments: [],
      query
    }
  }
}

QuestionDetails.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
}

export default QuestionDetails
