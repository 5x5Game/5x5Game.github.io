export function useMDParser() {
  const parse = (content: string) => {
    console.log(content);
    return content
      .replace(/^###### (.*$)/gim, '<h6 class="text-sm">$1</h6>')
      .replace(/^##### (.*$)/gim, '<h5 class="text-lg">$1</h5>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-xl">$1</h4>')
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl">$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      .replace(/\n$/gim, '<br />')
      .replace(/^- (.*$)/gim, '• $1<br />')
      .replace(/^\t- (.*$)/gim, ' • $1<br />')
      .replace(/^ - (.*$)/gim, ' • $1<br />')
      .replace(/^\* (.*$)/gim, '• $1<br />')
      .replace(/^\s\s\* (.*$)/gim, '<p> - $1</p>')
      .replace(/<\/li>\n<li>/gim, '</li><li>')
      .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
      .replace(/<\/ul>\n<ul>/gim, '</ul><ul>')
      .replace(/\n\n/gim, '<br /><br />');
  }
  return {
    parse
  }
}