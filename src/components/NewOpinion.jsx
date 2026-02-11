import { use, useActionState } from 'react';

import { OpinionsContext } from '../store/opinions-context.jsx';

import Submit from './Submit.jsx';



export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext)
  const [formState, formAction, pending] = useActionState(onSubmitAction, { errors: null})


  async function onSubmitAction(prevState, formData) {
    const errors = []
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName')


    if(title.trim().length < 3) {
      errors.push("Title must be greater then 3 characters long.")
    }

    if(userName.trim().length === 0) {
      errors.push("Please provide usename.")
    }

    if(body.trim().length < 6 || body.trim().length > 300) {
      errors.push("Opinion must be greater then six characters long and less then 300 chacters long.")
    }

    console.log("form submitted!")

    if(errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName, title, body
        }
      }
    }

    await addOpinion({
      userName, title, body
    })


    return {
      errors: null
    }
  }
  
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        { formState.errors && (<ul className="errors">
          {formState.errors.map((err) => <li key={err}>{err}</li>)}
        </ul>)}

        <Submit />
      </form>
    </div>
  );
}
