const shuffle = () => {
    const assets = [
        {    image: 'assets/C.png'},
        {    image: 'assets/Go.png'},
        {    image: 'assets/html.png'},
        {    image: 'assets/python.png'},
        {    image: 'assets/java.png'},
        {    image: 'assets/php.png'},
        {    image: 'assets/react.png'},
        {    image: 'assets/ruby.png'}
    ];
    return[...assets, ...assets]
        .sort(() => Math.random() - 0.5)
        .map((cards) => ({...cards, id: Math.random()}))
};

export default shuffle ;