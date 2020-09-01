import React from 'react'

const Error = (({ error }: { error: Error }) => (
  <div>
    <p>{`${error.name}`}</p>
    <p>{error.message}</p>
  </div>
))

export default Error
