import { Flex, Title } from "@mantine/core";

export default function Logo(...props) {
    return (
        <Flex align='center'>
            
      <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 48 48" {...props}>
    <g fill="currentColor">
        <path d="M31.336 28.127a.169.169 0 0 0-.007-.004l.007.004Z"></path>
        <path fillRule="evenodd" d="M19.466 12.876c.635-.56 1.157-1.316 1.337-2.038c.102-.41.15-1.059-.303-1.583c-.463-.537-1.148-.596-1.687-.528c-.425.054-.73.065-1.002.074l-.043.002c-.31.01-.68.023-1.087.155c-.425.138-.827.38-1.308.735a7.816 7.816 0 0 0-.887.759C12.857 9.292 10.76 8.839 7.469 9a1.5 1.5 0 0 0 .03 3h1.438c.086.059.168.116.245.171l-2.27 2.84a3 3 0 0 0-2.635 3.822l.29 1A3 3 0 0 0 7.447 22h3.122a1 1 0 0 1 .603.202l1.943 1.468c.17.128.348.235.532.323c1.157 3.13 2.402 5.796 3.812 7.572l.32 3.85A2 2 0 0 0 19 39h3a1 1 0 0 0 1-1v-8h3.12l.04.147a1 1 0 0 0 .85 1.808l.111-.046c.346.403.762.76 1.233 1.06l-.003.008a1 1 0 0 0 1.761.946l.083-.154a7.11 7.11 0 0 0 2.024.227l.026.135a1 1 0 0 0 1.964-.38l-.019-.095a6.37 6.37 0 0 0 1.392-.645l.2 2.403A2 2 0 0 0 37 39h3a1 1 0 0 0 1-1V21c0-2.629-.623-4.54-1.672-5.847c.845.163 1.401.445 1.772.802c.557.535.9 1.436.9 3.044l.387 5.42c-.236.365-.387.937-.387 1.58c0 1.105.448 2 1 2s1-.895 1-2c0-.643-.152-1.215-.387-1.58L44 19c0-1.834-.383-3.4-1.514-4.487c-1.117-1.073-2.756-1.477-4.773-1.511L34.698 13H21.5c-.75 0-1.423-.046-2.034-.124Zm18.062 3.258c-.778-.801-1.801-1.119-2.82-1.133H21.5c-2.29 0-3.97-.384-5.374-.863a1 1 0 0 1 .112-1.924c.683-.147 1.33-.401 1.725-.692a2.914 2.914 0 0 0 .713-.768c-.326.03-.584.039-.792.046h-.003c-.36.013-.465.022-.583.06c-.12.04-.319.134-.739.443c-.512.377-.896.778-1.12 1.109a1 1 0 0 1-1.514.163c-.691-.653-1.512-1.138-2.78-1.396l.113.102a1 1 0 0 1 .107 1.363l-3.184 3.98A1 1 0 0 1 7.4 17h-.24a1 1 0 0 0-.961 1.278l.288 1a1 1 0 0 0 .961.722h3.122a3 3 0 0 1 1.808.606l1.943 1.468c.118.088.238.144.357.174a1 1 0 0 1 .691.628c1.248 3.446 2.51 6.094 3.826 7.651a1 1 0 0 1 .232.563l.404 4.84A1 1 0 0 1 19 37h2v-8a1 1 0 0 1 1-1h6.23l-.09-.09c-1.13-1.137-2.443-2.573-2.968-3.35l1.656-1.12c.407.601 1.594 1.916 2.73 3.06a26.4 26.4 0 0 0 1.44 1.363c.183.155.29.233.331.26a.762.762 0 0 0-.165-.058a1 1 0 0 1 .344.219c1.38 1.343 2.862 2.344 5.158 2.73a1 1 0 0 1 .83.903l.335 4.014A1 1 0 0 1 37 37h2V21c0-2.58-.676-4.046-1.472-4.866ZM32 32c-1.943 0-3.237-.957-3.751-2h2.162c.78.726 1.629 1.378 2.63 1.902c-.323.063-.67.098-1.041.098Z" clipRule="evenodd"></path>
    </g>
</svg>
    
            <Title pl='xs' order={2}>MooManager</Title>
        </Flex>
    );
}