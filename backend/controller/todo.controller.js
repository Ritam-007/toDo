import Todo from "../model/todo.model.js"

export const createTodo = async (req,res) =>{           //crearting todo 
    const newTodo = new Todo({
        text:req.body.text,
        completed:req.body.completed,
        user: req.user._id,                              //associate todo with loggedin user
    })

    try {
        const savedTodo = await newTodo.save()                                          //if no error occurs, then created todo is saved
        res.status(201).json({message:"ToDo Created Successfully" , savedTodo});         
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error Occured in todo creation"});               //if error occurs...
    }
}


export const getTodos=async (req,res) =>{               //fetching datas from saved todo
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        const todos = await Todo.find({user: req.user._id});                                                //if no error, using find({user: req.user._id}), fetch todo only for loggedin user
        res.status(201).json({message:"ToDo Fetched Successfully" , todos});               
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error Occured in todo Fetching"});              //if error occurs
    }
};

export const updateTodo = async (req,res) => {          //updating todo
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {            //if no error occurs, using findByIdAndUpdate(), previous todo is updated into new todo
            new:true,                                                                   // new updated data is true or accepted
        });
        res.status(201).json({message:"ToDo Updated Successfully" , todo});
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error Occured in todo Updating"});
    }
}

export const deleteTodo = async (req, res) =>{
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo){
            return res.status(404).json({message: "Todo not found"});
        }
        res.status(201).json({message:"ToDo Deleted Successfully"});
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error Occured in todo deletion"});
    }
}
