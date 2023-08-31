 
 // eslint-disable-next-line react/prop-types
 const Alerta = ({ msg, type }) => {
    return(
        <div className={ type == 'danger' ? 'flex space-between alert-danger' : 'flex space-between alert-success' }>
            {msg}
            {/* <img className="icono-alerta" src="img/caution.svg" alt="caution image" width={30} /> */}
        </div>
    )
 }

 export default Alerta;