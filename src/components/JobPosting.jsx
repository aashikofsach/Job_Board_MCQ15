import React from 'react'

function  JobPosting({time,by,title,url}) {

    const formatTime = new Date(time*1000).toLocaleString();
  return (
    <div role='listitem' className='item'>
        <h2 className='post__title'><a href={url} target='_blank' rel='noopener' className={url ? "" : "inactive"}>{title}</a></h2>
        <span className='post__metadata'>By - {by} {formatTime} </span>
    </div>
  )
}

export default JobPosting