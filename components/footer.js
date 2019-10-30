import Link from 'next/link'
export default function () {
  return (
    <footer className="footer" style={{ padding: '3rem 1.5rem' }}>
      <div className="content has-text-centered">
        <p>
          <strong>MDS Interview</strong> &copy; 2019. <Link href="/privacy"><a>Политика конфиденцианальности</a></Link>
        </p>
      </div>
    </footer>
  )
}
