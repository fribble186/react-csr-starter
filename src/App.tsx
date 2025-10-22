import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next";
 
function App() {
    const { t } = useTranslation("common");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>{t('Welcome')}</Button>
    </div>
  )
}
 
export default App