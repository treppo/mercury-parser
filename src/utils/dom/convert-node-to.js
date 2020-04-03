import getAttrs from './get-attrs';

export default function convertNodeTo($node, $, tag = 'p') {
  const node = $node.get(0);
  if (!node) {
    return $;
  }
  const attrs = getAttrs(node) || {};

  const attribString = Reflect.ownKeys(attrs)
    .map(key => `${key}=${attrs[key]}`)
    .join(' ');
  const html = $node.contents();

  $node.replaceWith(`<${tag} ${attribString}>${html}</${tag}>`);
  return $;
}
