import Head from "next/head"
import ContentLoader, { Instagram as Default } from "react-content-loader"

const SkeletonLoader = () => {
  return (
    <div className="h-fit rounded-xl bg-white p-10">
      <ContentLoader>
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
    </div>
  )
}

const DefaultLoader = (props: Default) => {
  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="31" cy="31" r="15" />
      <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
      <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
      <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
    </ContentLoader>
  )
}

const PageLoader = () => {}

interface Props {
  props?: any
}

interface Default {
  className?: string
}

export { SkeletonLoader, DefaultLoader, PageLoader }
