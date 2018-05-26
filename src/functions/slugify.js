export default function slugify(text)
{
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    const to   = "aaaaaeeeeeiiiiooooouuuunc------";
    for(let i = 0; i < from.length; i++) {
        text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    return text
        .toString()                     // Cast to string
        .toLowerCase()                  // Convert the string to lowercase letters
        .trim()                         // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/&/g, '-y-')           // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}
