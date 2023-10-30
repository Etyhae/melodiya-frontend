const Playlist = ({playlist, onClick}) => {
    return (
        <>
        <button className="flex flex-col justify-center items-center content-center text-center hover:opacity-80" onClick={onClick}>
            <img src={playlist.cover} alt={playlist.name} className="w-28 h-28 rounded-md" />
            <p className="text-white text-lg">{playlist.playlistName}</p>
            <p className="text-sm text-slate-400">{playlist.compiler}</p>
        </button>
        </>
    )
}

export default Playlist;