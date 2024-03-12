export default function Card({ imageUrl, name, onClick, image}) {
    return (
        <div className='Card' onClick={onClick || function(){}}>
            <img
                src={image.src}
                alt={'Cat picture: ' + name}
                width='200px'
            />
            <h3>{name}</h3>
        </div>
    )
}