export function RegisterPage() {


    return (
        <form onSubmit={(e) => (new FormData(e.target))}>
            <label htmlFor="email">Username</label>
            <input id="email" name="email" required />

            <label htmlFor="password">Password (min. 6 characters)</label>
            <input id="password" name="password" type="password" required />

            <label htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" required />
        </form>
    )
}