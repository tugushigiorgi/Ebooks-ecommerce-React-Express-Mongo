const {coupon} = require("../Models/Coupon");








exports.AddCoupon=async(req,res)=>{
    const { code,discount}=req.body;
    let checkifExists=await coupon.find({code:code});

    if(checkifExists.length>0){

        return res.status(400).send({ message: 'Coupon already exists '});
    }

    try{


        const newCoupon = await coupon.create({ code: code, discount: Number(discount) });


        const newCouponId = newCoupon._id;

        return res.status(200).send({ message: 'Coupon added successfully', couponId: newCouponId });


    }catch(error){
        return res.status(500).send({ message: 'Internal Server Error' });


    }

}




exports.DeleteCoupon=async (req,res)=>{

    const id = req.params.id;


    let checkifexists=await coupon.findById(id);

    if(!checkifexists){

        return res.status(404).send({ message: 'Coupon with given id does not exists '});

    }
    try{

        await coupon.deleteOne({ _id: id});
          return res.json({ message: 'Coupon deleted successfully' });
    }catch(error){

        return res.status(500).send({ message: 'Internal Server Error' +error});


    }

}


exports.getCoupons=async (req,res)=>{
    try{

        const allcoupons = await coupon.find({});

        if(allcoupons.length>0){

            const couponDTO = allcoupons.map(cp => ({
                id: cp._id,
                code: cp.code,
                discount:cp.discount
               
            }));
            return res.status(200).json({couponDTO});

        }
     return res.status(404).json({message:"Coupons not found "});


    }catch(error){

        return res.status(500).send({ message: 'Internal Server Error' +error});


    }
}




exports.getCouponByCode=async(req,res)=> {


    try {

        const  code  = req.params.couponcode;
        let Coupon = await coupon.findOne({code: code})
        if (Coupon) {

            let couponDto={
                code:Coupon.code,
                discount:Coupon.discount
            }

            return res.status(200).json({couponDto });

        }

        return res.status(404).send({message: 'Code does not exists'});


    } catch (error) {


        return res.status(500).send({message: 'Internal Server Error' + error});

    }

}

exports.getRandomCoupon=async (req,res)=>{


        try{
   //  let count  = await coupon.countDocuments()
   // const randomIndex = Math.floor(Math.random() * count);



    let RandomCoupon = await coupon.findOne( )
            if ( RandomCoupon) {

                let couponDto = {
                    code: RandomCoupon.code,
                    discount: RandomCoupon.discount


                }

                return res.status(200).json({couponDto});


            }

            return res.status(404).json({message:"Coupon not found"});


        }catch (e){

            return res.status(500).send({message: 'Internal Server Error' + e});

        }




}
