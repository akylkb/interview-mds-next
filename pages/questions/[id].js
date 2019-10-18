import { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/layout'
import PageHeader from '../../components/page-header'
import Box from '../../components/box'
import Avatar from '../../components/avatar'
import Icon from '../../components/icon'
import ListComments from '../../components/list-comments'
import CommentForm from '../../components/comment-form'
import Spinner from '../../components/spinner'

const QuestionDetails = ({ question, comments: initialComments = [] }) => {
  const {
    id,
    title,
    description,
    user,
    comments_count: commentsCount
  } = question

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

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <PageHeader title={title}>
          {description && (
            <div className="content">
              {description}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Avatar id={user.id} name={user.name} />
            <div className="buttons">
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
          <CommentForm
            url={`/api/comment/question/${id}`}
            onSuccess={updateComments}
          />

          {loadingComments && <Spinner caption="Загрузка комментариев" />}
          {!loadingComments && <ListComments comments={comments} />}

        </Box>
      </Layout>
    </>
  )
}

QuestionDetails.getInitialProps = async ({ query }) => {
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
