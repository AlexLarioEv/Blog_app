// eslint-disable-next-line import/named
import { useSelector, TypedUseSelectorHook } from 'react-redux'

import { RootState } from '../store'

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default useTypedSelector
