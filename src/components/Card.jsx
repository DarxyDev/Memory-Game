export default function Card(imageUrl,name){
    return (
        <div className='Card'>
            <img src={imageUrl} alt={'Cat picture: ' + name} />
            <h3>{name}</h3>
        </div>
    )
}