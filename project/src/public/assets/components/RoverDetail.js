export const RoverDetail = (rover) => {
    if(!rover || !rover.name) return '';
    return `
    <section class='rover-detail'>
        <h3>Rover Detail</h3>
        <div>
            <label>Name: </label>
            ${rover.name}
        </div>
        <div>
            <label>Launch Date:</label>
            ${rover.launch_date}
        </div>
        <div>
            <label>Landing Date:</label>
            ${rover.landing_date}
        </div>
        <div>
            <label>Status:</label>
            ${rover.status}
        </div>
        <div>
            <label>Max Sol:</label>
            ${rover.max_sol}
        </div>
        <div>
            <label>Max Date:</label>
            ${rover.max_date}
        </div>
    </section>
    `
}