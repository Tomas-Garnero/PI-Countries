export default function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Un nombre de actividad es necesario en esta casilla";
    } else if(input.name.length < 3){
        errors.name = "Como mínimo 3 caracteres"
    }else if (input.name.length > 25){
        errors.name = "Como máximo 35 caracteres"
    }else if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(input.name)){
        errors.name = "El nombre de la actividad no debe contener números o caracteres especiales"
    }
    return errors
}