export default function Card({ imageUrl, name, onClick }) {
    return (
        <div className='Card' onClick={onClick}>
            <img
                src={imageUrl}
                alt={'Cat picture: ' + name}
                width='200px'
            />
            <h3>{name}</h3>
        </div>
    )
}