import {VmComponent} from '@/components/vm/VmComponent'
import {useBosComponents} from '@/hooks/useBosComponents'

export function MyCustomHomePage() {
    const components = useBosComponents();


    return <>
    <VmComponent src={components.myProfilePage} props={{accountId: 'c842b1a648114a20cfca00f01718ee4c6f46d772951d9f8f31dffc189da63b80'}}/>
    </>
}