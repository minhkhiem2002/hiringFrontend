import { CircularProgress } from "@mui/material"

const Loading = () => {
    return (
        <div className='fixed top-0 left-0 h-screen w-full bg-slate-50 z-10 flex justify-center items-center opacity-75'>
            <CircularProgress />
        </div>
    )
}
export default Loading
