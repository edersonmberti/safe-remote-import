import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'

const FakeRemoteComponent = React.lazy(() => import('remote/fake-component'))

const FakeRemoteFallback = () => <p>Error to load FakeRemoteComponent</p>

const FakeRemoteErrorBoundary = withErrorBoundary(FakeRemoteComponent, {
  FallbackComponent: FakeRemoteFallback,
  onError(error, info) {
    // Do something with the error
    // E.g. log to an error logging client here
    console.error('ERROR -> FakeRemote', error)
    console.info('INFO -> FakeRemote', info)
  },
})

export default FakeRemoteErrorBoundary