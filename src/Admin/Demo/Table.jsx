import React from 'react'
import { useTranslation } from 'react-i18next';

const Table = () => {

    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    return (
        <>
            <div>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('fr')}>Français</button>
                <button onClick={() => changeLanguage('pt')}>Português</button> {/* Add Portuguese */}
            </div>
            <h1>{t('description')}</h1>
        </>
    )
}

export default Table