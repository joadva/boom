
module.exports = {
    checkRolIsAdmin: (req, res, next) => {
      const {} = req.decoded.result;
      if(roles_name !== 'ADMIN') return res.status(403).send({
          message: 'No tienes permisos para entrar a esta sección'
        })
      next();
    },
    checkRolIsCustomer: (req, res, next) => {
        const {roles_name} = req.decoded.result;
        if(roles_name !== 'ADMIN' !== roles_name !== 'CLIENT') return res.status(403).send({
            message: 'No tienes permisos para entrar a esta sección'
        })
        next();
    },
  };